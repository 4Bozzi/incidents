const weather = require('./weather.js');
const express = require('express');
let jsonData1 = require('./incidents/F01705150050.json');
let jsonData2 = require('./incidents/F01705150090.json');
const app = express();

const port = 3001;

app.get('/', (req, res) => {
  weather('2019-05-02', '01:00');
  res.send('Hello World!');
});

app.get('/start', (req, res) => {
  res.send(JSON.stringify([jsonData1, jsonData2]));
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
