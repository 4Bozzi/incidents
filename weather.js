const unirest = require('unirest');
let jsonData = require('./incidents/F01705150050.json');

//'https://api.meteostat.net/v1/stations/search?q=richmond&key=g1trqie6'

module.exports = getHourlyWeather = (date, hour) => {
  //example date 2019-05-02

  unirest
    .get(
      `https://api.meteostat.net/v1/history/hourly?station=72401&start=${date}&end=${date}&time_zone=America/New_York&time_format=Y-m-d%20H:i&key=g1trqie6`
    )
    .then((response) => {
      response.body.data.forEach((item) => {
        if (item.time_local === `${date} ${hour}`) {
          jsonData.weather = item;
        }
      });
      console.log(JSON.stringify(jsonData));
    });
};
