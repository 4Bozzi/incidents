const weather = require('./weather.js');
const express = require('express');
const formidable = require('express-formidable');
var fs = require('fs');
const app = express();
app.use(formidable());

const port = 3001;

app.post('/upload', (req, res) => {
  console.log(`req: ${JSON.stringify(req.files)}`);
  //req.fields;
  //req.files;
  fs.readFile(req.files.newIncident.path, async function (err, data) {
    if (err) {
      throw err;
    }
    const enhancedData = await weather(JSON.parse(data));
    console.log(`enhancedData: ${JSON.stringify(enhancedData)}`);
    res.send(enhancedData);
  });
});

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
