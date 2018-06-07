// fuser -k -n tcp PORT
const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const PORT = 3000;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + 'public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
    let name = text.split();
    let output = '';

    for(let i=0; i < name.length; i++){
        name[i] = capitalizeFirtLetter(name[i]);
    }

    for(let j=0; j < name.length; j++){
        output += ' '+name[j];
    }

    return output;
})

function capitalizeFirtLetter(data) {
    return data.charAt(0).toUpperCase() + data.slice(1);
}

app.use((req, res, next) => {
    systemLogger(req);
    next();
});

app.get('/', (req, res) => {
    res.send({
        name: 'Derek',
        age: 34,
        surname: 'Captain'
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'welcome to dshop',
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about page',
        currentYear: new Date().getFullYear()
    });
});


var systemLogger = (data) => {
    let now = new Date().toString();
    let log = `${now}: ${data.method} ${data.url}`;
    fs.appendFile('systemlog.log', log + '\n', (error) => {
        console.log(error);
    });
};


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});