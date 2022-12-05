const express = require('express');
const path = require('path');
const app = express();

const fs = require('fs');

const rawdata = fs.readFileSync(path.join(process.cwd(), 'config.json'));
const config = JSON.parse(rawdata);

const PORT = config.PORT || 8000

app.use(express.static(path.join(process.cwd(), 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
  //res.json(config)
});

app.listen(PORT, () => {
    console.log(`server run on port ${PORT}`)
});