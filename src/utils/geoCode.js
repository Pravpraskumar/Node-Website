const request = require('request');

const geoCode = (address, callback) => {
    const llurl =   'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhdnByYXNrdW1hciIsImEiOiJja2NyeWRndDIwYWpwMnNvNDVlYnZvdXE1In0.cNK3uGfyzqtsheqYbO7L8g';
        
        request({url: llurl, json:true},function(error,response){
            if(error){
                callback('Unable to connect to Location Services', undefined);
            }else if(response.body.message === 'Not Found'){
                callback('Location not Provided', undefined);
            }else if(response.body.features.length === 0){
                callback('Unable to find Location', undefined);
            }else{
                const location = response.body.features[0].place_name;
                const latitude = response.body.features[0].center[1];
                const longitude = response.body.features[0].center[0];
                callback(undefined, {
                    placeName : location,
                    latitude: latitude,
                    longitude: longitude
                });
            }
        });
}

module.exports = geoCode 