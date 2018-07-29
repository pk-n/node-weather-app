const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const args = yargs.options({
    address:{
        demand: true,
        alias: "a",
        describe: "address to fetch weather for",
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

geocode.geoCodeAddress(args.address,(err, geoResult)=> {
    if(err){
        console.log(err);
    }else{
        weather.getWeather(geoResult.lat, geoResult.lng, (err, tempResult) => {
            if(err){
                console.log(err);
            }else{
                console.log(`It is ${tempResult} celcius in ${geoResult.address}`);
            }
        })
    }
});