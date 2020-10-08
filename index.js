require('dotenv').config();

const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const getWeather = require('./lib/getWeather');

const app = express();

app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'layout',
}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    let data = await getWeather();
    console.log(data);

    let location = data.name;
    let country = data.sys.country;
    let desc = data.weather[0].description;


    let iconcode = data.weather[0].icon;
    let iconimg = "http://openweathermap.org/img/w/" + iconcode + ".png";

    

    let temp = Math.floor(data.main.temp -273.15);
    let feels = Math.floor(data.main.feels_like -273.15);


    let sunrise = data.sys.sunrise *1000;
    let rise = new Date(sunrise);
    let humanrise = rise.toLocaleString();

    let sunset = data.sys.sunset * 1000;
    let set = new Date(sunset);
    let humanset = set.toLocaleString();
    
    res.render('index', {location, country, desc, iconcode, temp, feels, humanrise, humanset, iconimg });
});



app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
});















