const request = require('request');

function geoCodeAddress(address, callback){
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}?key=AIzaSyDtrlMXuMXPzYE3h1iPIcEhdBbaGGmphSQ`,
        json: true
    }, function(err, resp, body){
        if(err){
            callback("Unable to connect to Google api");
        }else if(body.status == "OK"){
            callback(undefined, {
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng,
                address: body.results[0].formatted_address
            });
        }else if(body.status == "ZERO_RESULTS"){
            callback('Invalid address');
        }
    });
}

module.exports = {
    geoCodeAddress
}