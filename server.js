const weather = require('./weather.js');
const express = require('express');
const app = express();

const port = 3001;

app.get('/', (req, res) => {
  weather('2019-05-02', '01:00');
  res.send('Hello World!');
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
