const path    = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode.js');
const getWeather = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

console.log(__dirname);
console.log(path.join(__dirname, '../public'));
//console.log(__filename);
const www = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath); 
app.use(express.static(www));



app.get('', (req, res)=>{
    //res.send('<h1>Hello Express!</h1>')
    res.render('index',{
        title:'Weather',
        name:'Praveen Kuppili'
    });
})

app.get('/help', (req, res)=>{
    //res.send({Name : 'Andrew',Age: 29})
    res.render('help',{
        title: 'Help',
        name : 'Praveen Kuppili'
    })
})

app.get('/about',(req, res)=>{
    //res.send('About Page of the App!')
    res.render('about',{
        title: 'About',
        name: 'Praveen Kuppili'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Your Query is Null and app wont show data'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,placeName}={}) => {
        if(error){
            return res.send({error});
        }
        getWeather(latitude, longitude, (error,gdata) => {
            if(error){
                return res.send({error});
            }
            res.send({
                location: req.query.address,
                placename: placeName,
                latitude: latitude,
                longitude: longitude,
                forecast: gdata.weatherDesc,
                current:  gdata.curTemp,
                feels: gdata.feelsLike
                
            });
            //console.log(gdata);
            //console.log(placeName);
        })
    });
})



app.get('/products', (req, res)=>{
    if(!req.query.search){
        return  res.send({
                    error: 'You must have provided a search term'
                })
    }
    
    console.log(req.query);
    
    res.send({
        products: []
    });
})

app.get('/help/*',(req,res)=>{
    //res.send('Help Article not found');
    res.render('error',{
        title: 'Help',
        error: 'Help Article Not Found',
        name: 'Praveen Kuppili'
    });
});

app.get('*',(req, res) => {
    //res.send('404 Error Found');
    res.render('error',{
        title: '404 Error',
        error: 'Page Not Found',
        name: 'Praveen Kuppili'
    })
});

app.listen(port, ()=> {
    console.log('Server is up on port '+ port);
});