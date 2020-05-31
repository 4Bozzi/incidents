const weather = require('./weather.js');
const express = require('express');
const formidable = require('express-formidable');
var fs = require('fs');
const app = express();
app.use(formidable());

const port = 3001;

app.post('/start', (req, res) => {
  res.send({});
});

app.post('/upload', (req, res) => {
  fs.readFile(req.files.newIncident.path, async function (err, data) {
    if (err) {
      throw err;
    }
    const enhancedData = await weather(JSON.parse(data));
    res.send(enhancedData);
  });
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
