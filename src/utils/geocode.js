let request=require('request')
let geocode = (address,callback) => {
    let url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWVodWw3MzQ5IiwiYSI6ImNrYTkzaDE0cDBhdG4yeHFqbW1laHd2NGEifQ.I41woyIjhqb5WV9mQNYDCg&limit=1'
    request({url, json: true },(error, {body}) => {
        if(error){
            callback('Unable to connect to location serives',undefined)
        }else if(body.message){
            callback('Some problem in api',undefined)
        }else if(body.features.length === 0){
            callback('No such location exists',undefined)
        }else{
            let data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode