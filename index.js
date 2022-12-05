const express = require('express');
const path = require('path');
const app = express();

const fs = require('fs');

const dirname = process.cwd();

const rawdata = fs.readFileSync(path.join(dirname, 'config.json'));
const config = JSON.parse(rawdata);

const PORT = config.PORT || 8000

app.use(express.static(path.join(dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(dirname, 'build', 'index.html'));
  //res.json(config)
});

app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`)
});