const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile(`server.log`, log + '\n', (err) => {
        if (err) {
            console.log(`Unable to append to server.log.`);
        }        
    });
    next();
});

// app.use((req, res, next) => {
//     res.render(`maintenance.hbs`);
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'WoW Info Search Home',
        welcomeMessage: 'Welcome to my WoW Search Page'
    });
});

app.get(`/about`, (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'WoW Search About Page',
        author: 'B.J. Shay',
        createDate: '6/15/2018',
        message: 'About page for the WoW Search Page'
    });
});

app.get(`/bad`, (req, res) => {
    res.send({
        errCode: 1,
        errMessage: `Something went wrong`
    });
});

app.listen(3001, () => {
    console.log(`Server is up on port 3001`);
});