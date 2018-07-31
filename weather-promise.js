const rp = require('request-promise');

function tempAt(address){
    var encodedAddress = encodeURIComponent(address);
    var formattedAddress;
    rp({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}?key=AIzaSyDtrlMXuMXPzYE3h1iPIcEhdBbaGGmphSQ`,
        json: true
    }).then((body)=>{
        if(body.results.length > 0){
            // call weather api
            obj = {
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng,
                address: body.results[0].formatted_address
            }
            formattedAddress = obj.address;
            return obj;
            //getWeather(obj.lat, obj.lng, obj.address)
        }else if(body.results.length == 0){
            throw("OOps! Geolocation api error")
        }
    }).then((obj)=>{
        var lat = obj.lat;
        var long = obj.lng
        return rp({
            url: `https://openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b6907d289e10d714a6e88b30761fae22`,
            json: true
        })
    }).then((body)=>{
            if(body.cod == 200){
                console.log(`it is ${body.main.temp} at ${formattedAddress}`);
            }else{
                throw("Sorry! We cannot find weather.");
            }
    }).catch((err)=>{
        console.log(err);
    })
}

tempAt("Jayanagar");