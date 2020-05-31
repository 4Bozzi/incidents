const unirest = require('unirest');
let jsonData = require('./incidents/F01705150050.json');

//'https://api.meteostat.net/v1/stations/search?q=richmond&key=g1trqie6'

module.exports = getHourlyWeather = (incident) => {
  //example date 2019-05-02
  const date = new Date(incident.description.event_opened);
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const hoursString = `${date.getHours()}:00`;
  unirest
    .get(
      `https://api.meteostat.net/v1/history/hourly?station=72401&start=${dateString}&end=${dateString}&time_zone=America/New_York&time_format=Y-m-d%20H:i&key=g1trqie6`
    )
    .then((response) => {
      response.body.data.forEach((item) => {
        if (item.time_local === `${dateString} ${hoursString}`) {
          jsonData.weather = item;
        }
      });
      console.log(JSON.stringify(jsonData));
    });
};
