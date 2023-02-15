const express = require('express');
const path = require('path');
const fs = require('fs');
const dirname = process.cwd();

const app = express();

var config = {}

try {
  const rawdata = fs.readFileSync(path.join(dirname, 'configFrontend.json'));
  const data = JSON.parse(rawdata);
  config = data;
}
catch (e) {
  console.log('config file ->', e.message);
}

const PORT = config.PORT || 8000;
const HOST = config.HOST || 'localhost';

app.use(express.static(path.join(dirname, 'build')));

app.get('/*', (req, res) => {
   res.sendFile(path.join(dirname, 'build', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`server run on ${HOST}:${PORT}`);
});