const request = require('request');

function getWeather(lat, long, callback){
    request({
        url: `https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b6907d289e10d714a6e88b30761fae22`,
        json: true
    }, function(err, resp, body){
        if(err){
            callback("unable to connect to weather api");
        }else if(body.cod == 200){
            callback(undefined, body.main.temp);
        }else{
            callback("Sorry! We cannot find weather.");
        }
    });
}

module.exports = {
    getWeather
}