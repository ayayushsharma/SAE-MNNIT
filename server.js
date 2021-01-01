process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const contactSAE = require('./mailData');
//const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8000;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('SAE-MNNIT/static'));

//app.use(helmet());

app.use(compression());

app.get('/', (req, res) => {
    res.redirect('/Home.html');
});

app.get('/Achievements.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/SAE-MNNIT/Achievements.html');
});

app.get('/Events.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/SAE-MNNIT/Events.html');
});

app.get('/Faculty%20Corner.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/SAE-MNNIT/Faculty Corner.html');
});

app.get('/Home.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/SAE-MNNIT/Home.html');
});

app.get('/Gallery.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/SAE-MNNIT/Gallery.html');
});

app.get('/Projects.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/SAE-MNNIT/Projects.html');
});

app.get('/Sponsors.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/SAE-MNNIT/Sponsors.html');
});

app.get('/Team.html', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/SAE-MNNIT/Team.html');
});

app.get('/404', (req, res) => {
    res.status(404);
    res.sendFile(__dirname + '/SAE-MNNIT/404.html');
});

app.get('/500', (req, res) => {
    res.sendFile(__dirname + '/SAE-MNNIT/500.html');
});

app.get('/message-sent-successfully', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/SAE-MNNIT/messageSent.html');
});

app.post('/500', (req, res) => {
    res.sendFile(__dirname + '/SAE-MNNIT/500.html');
});

app.get('*', function (req, res) {
    res.redirect('/404');
});

app.post('/Home.html', urlencodedParser, (req, res) => {
    
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: contactSAE.mailID,
            pass: contactSAE.mailPass
        }
    });

    const mailDetails = {
        from: contactSAE.mailID,
        to: contactSAE.mailID,
        subject: String(req.body.subject),
        text: "Name - " + String(req.body.name) + "\nE-mail Address - " + String(req.body.email) + "\nSubject - " + String(req.body.subject) + "\nMessage - " + String(req.body.message)
    };

    try {
        mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log(err);
                console.log('Email not sent');
                res.sendFile(__dirname + '/SAE-MNNIT/500.html');
            } else {
                res.redirect('/message-sent-successfully');
                console.log('Email sent successfully');
            }
        });
    } catch (error) {

    }

});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
console.log(`http://localhost:${PORT}/`);


