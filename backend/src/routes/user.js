const axios = require('axios');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Buffer } = require('buffer');
const express = require('express');
const router = express.Router();

const sendMail = require('../utils/mail');

const User = require('../models/user');


router.post('/signup', async (req, res) => {
    const {email, username, password} = req.body;
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hpass = bcrypt.hash(password, salt);

        let user = await User.findOne({email});
        if (user) return res.sendStatus(400);

        const token = jwt.sign({email, username, password: await hpass}, process.env.SALT, {expiresIn: '10m'});

        const content = `Hi! There, You have recently register an account on our website with your email.<br>
        The link will be expired in 10 minutes. Please follow the given link to verify your email:<br>
        http://localhost:5000/users/verify/${token}<br>
        Thanks`;
        const mail = {email, subject: "NodeJS send Email by OAuth2", content: content};
        await sendMail(mail);

        res.send("Success");
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
            
            await new User(data).save();
            
            res.send("email verified sucessfully");
        })
    } catch (error) {
        res.status(400).send("An error occured");
    }
});


module.exports = router;
