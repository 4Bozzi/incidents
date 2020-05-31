const weather = require('./weather.js');
const express = require('express');
let jsonData1 = require('./incidents/F01705150050.json');
let jsonData2 = require('./incidents/F01705150090.json');
const app = express();

const port = 3001;

app.get('/', (req, res) => {
  //   const enhancedData = weather(jsonData1);
  //   console.log(`data: ${enhancedData}`);
  //   res.send(enhancedData);
});

app.get('/start', (req, res) => {
  const enhancedData = weather(req);
  res.send(enhancedData);
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
