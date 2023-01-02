require("dotenv").config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const MainServer = require('./src/servers/main');

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://127.0.0.1/task_management')
        .then(() => {
            MainServer.listen(port, () => console.log('Main Server run at:', port));
        })
