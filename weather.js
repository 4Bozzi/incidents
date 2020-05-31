const unirest = require('unirest');
let jsonData = require('./incidents/F01705150050.json');

//'https://api.meteostat.net/v1/stations/search?q=richmond&key=g1trqie6'

module.exports = getHourlyWeather = async (incident) => {
  const date = new Date(incident.description.event_opened);
  const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const hoursString = `${date.getHours()}:00`;
  const response = await unirest.get(
    `https://api.meteostat.net/v1/history/hourly?station=72401&start=${dateString}&end=${dateString}&time_zone=America/New_York&time_format=Y-m-d%20H:i&key=g1trqie6`
  );
  response.body.data.forEach((item) => {
    console.log(`item: ${item}`);
    if (item.time_local === `${dateString} ${hoursString}`) {
      console.log(`item: ${items}`);
      jsonData.weather = item;
    }
  });
  //console.log(`jsonData: ${JSON.stringify(jsonData)}`);
  return jsonData;
};
