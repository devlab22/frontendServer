const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const fs = require('fs');

const dirname = process.cwd();

var config = {}

app.use(helmet());

try {
  const rawdata = fs.readFileSync(path.join(dirname, 'configFrontend.json'));
  const data = JSON.parse(rawdata);
  config = data;
}
catch (e) {
  console.log('config file ->', e.message);
}

var corsOptions = {
  "origin": "*",
  "Access-Control-Request-Method": "POST,GET,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
  "optionsSuccessStatus": 200
};

app.use(cors(corsOptions));

const PORT = config.PORT || 8000;
const HOST = config.HOST || 'localhost';

app.use(express.static(path.join(dirname, 'build')));

app.get('/*', (req, res) => {
   res.sendFile(path.join(dirname, 'build', 'index.html'));
   //res.json({host: HOST, port: PORT});
});

app.listen(PORT, HOST, () => {
  console.log(`server run on ${HOST}:${PORT}`);
});