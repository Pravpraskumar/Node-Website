const request = require('request');

const getWeather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1c35f16181ff42efd20cc2691a10f5a1&query='+latitude+','+longitude;
        
        //request( {url: url, json: true},function(error,response){
        request( {url, json: true},function(error,response){
            if(error){
                callback('Unable to Connect to Weather Service', undefined);
            }else if(response.body.error){
                callback(response.body.error, undefined);
            }else{
            const curTemp = response.body.current.temperature;
            const feelsLike = response.body.current.feelslike;
            //console.log(response.body.current.weather_descriptions[0]+': It is currently '+ curTemp+' Fahrenheit outside and it feelslike '+feelsLike+' fahrenheit now');
            //console.log(response.body.current.weather_descriptions[0]+': It is currently '+ curTemp+' Degrees outside and it feelslike '+feelsLike+' Degrees now');
                callback(undefined, {
                    weatherDesc :response.body.current.weather_descriptions[0],
                    curTemp     :curTemp,
                    feelsLike   :feelsLike
                })
            }
        });
}

module.exports = getWeather