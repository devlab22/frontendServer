const express = require('express');
const path = require('path');
const app = express();

const fs = require('fs');

const dirname = process.cwd();

let config = {}

try {
  const rawdata = fs.readFileSync(path.join(dirname, 'config.json'));
  const data = JSON.parse(rawdata);
  config = data;
}
catch (e) {
  
}

const PORT = config.PORT || 8000;

app.use(express.static(path.join(dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(dirname, 'build', 'index.html'));
  // res.json(PORT);
});

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});