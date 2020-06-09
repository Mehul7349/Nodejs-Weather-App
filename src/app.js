const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app=express()
const port= process.env.PORT || 3000

const publicDirPath = path.join(__dirname,'../public')
// Setup static directory to use
app.use(express.static(publicDirPath)) 

const viewsPath = path.join(__dirname,'../templates/views')
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

const partialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Mehul Varshney'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: "About Me",
        name: "Mehul Varshney"
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        text: 'Some helpful text.',
        name: "Mehul Varshney"
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide the address!'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {

        if(error){ 
            return res.send({ error })
        }
        forecast(latitude,longitude, (error, data2) => {
            if(error){
                return res.send({ error })
            }
            forcastData = 'Temperature is '+ data2.current.temp+' C and '+'Wind Speed is '+ data2.current.wind_speed+' m/s'
            res.send({
                forecast: forcastData,
                location
            })
        })
    })
}) 

app.get('/help/*',(req,res) => {
    res.render('404_page',{
        title: '404',
        errorMsg: 'Help Article not found!',
        name: 'Mehul Varshney'
    })
})

app.get('*',(req,res) => {
    res.render('404_page',{
        title:'404',
        errorMsg:'Page not found!',
        name:'Mehul Varshney'
    })
})

app.listen(port,() => {
    console.log('Server is up on port '+port)
})

