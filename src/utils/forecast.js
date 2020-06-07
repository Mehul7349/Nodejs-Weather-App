//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request")

let forecast = (latitude,longitude,callback) => {
    let url='https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&%20exclude=currently&appid=25356bc002cea8477bca3793042853e7&units=metric'
    request({url, json: true },(error,{body}) => {
        if(error){
            callback('Unable to connect to openWeatheMap service!',undefined)
        }else if(body.cod){
            callback('Unable to find location!',undefined)
        }else{
            callback(error,body)
        }
    })
}

module.exports = forecast