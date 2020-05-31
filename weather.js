const unirest = require('unirest');

//'https://api.meteostat.net/v1/stations/search?q=richmond&key=g1trqie6'

module.exports = getHourlyWeather = async (incident) => {
  const date = new Date(incident.description.event_opened);
  const dateString = `${date.getFullYear()}-${addLeadingZero(
    date.getMonth()
  )}-${addLeadingZero(date.getDate())}`;
  const hoursString = `${addLeadingZero(date.getHours())}:00`;
  const response = await unirest.get(
    `https://api.meteostat.net/v1/history/hourly?station=72401&start=${dateString}&end=${dateString}&time_zone=America/New_York&time_format=Y-m-d%20H:i&key=g1trqie6`
  );
  response.body.data.forEach((item) => {
    if (item.time_local === `${dateString} ${hoursString}`) {
      incident.weather = item;
    }
  });

  return incident;
};

const addLeadingZero = (number) => {
  if (number <= 9) {
    return `0${number}`;
  }
  return number;
};
