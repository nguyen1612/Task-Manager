const axios = require('axios');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Buffer } = require('buffer');
const express = require('express');
const router = express.Router();

const sendMail = require('../utils/mail');

const User = require('../models/user');
const Token = require('../models/token');


router.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        console.log(req.body);
        if (!user) return res.sendStatus(400);

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.sendStatus(404);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
})

router.post('/signup', async (req, res) => {
    const {email, username, password} = req.body;
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hpass = bcrypt.hash(password, salt);

        let user = await User.findOne({email});
        if (user) return res.status(400).send("existed email");

        const token = jwt.sign({email, username, password: await hpass}, process.env.SALT, {expiresIn: '30s'});

        new Token({token}).save();

        const content = `Hi! There, You have recently register an account on our website with your email.<br>
        The link will be expired in 10 minutes. Please follow the given link to verify your email:<br><br>
        http://localhost:5000/users/verify/${token}<br><br>
        Thanks`;
        const mail = {email, subject: "NodeJS send Email by OAuth2", content: content};
        await sendMail(mail);

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400)
    }
})

router.get('/tmp', async (req, res) => {
    const headers = {
        'Accept-Encoding': 'gzip, identity',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
    };

    let data = await axios.get('https://s2.googleusercontent.com/s2/favicons?domain=http://www.stackoverflow.com', headers);

    data = Buffer.from(data.data).toString('base64');
    console.log(data);

    res.send("YES")
})

router.get("/verify/:token", async (req, res) => {
    try {
        jwt.verify(req.params.token, process.env.SALT, async (err, data) => {
            if (err) return res.send("Invalid Link");
            
            const token = await Token.findOne({token: req.params.token});
            if (!token) return res.status(404).send("Invalid Link");

            const {email, username, password} = data;
            await Token.deleteOne({token: req.params.token});
            await new User({email, username, password}).save();
            
            // res.send("Email verified sucessfully <h3>Back to Login</h3>");
            res.redirect("http://localhost:3000/login");
        })
    } catch (error) {
        res.status(400).send("An error occured");
    }
});


module.exports = router;