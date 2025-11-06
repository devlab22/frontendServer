
import express from 'express';
import path from 'path';
import fs from 'fs'
import helmet from 'helmet'
//import https from 'https'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './src/myRouter.js'

const dirname = process.cwd();

const app = express();
app.use(helmet())
app.use(cookieParser())
app.use(cors())

var config = {}

try {
  const rawdata = fs.readFileSync(path.join(dirname, 'config.json'));
  config = JSON.parse(rawdata);
}
catch (e) {
  console.log('config file ->', e.message);
}

const PORT = config.PORT || 8000;
const HOST = config.HOST || 'localhost';

app.use(express.static(path.join(dirname, 'build')));

app.use('/api/', userRouter)

// by react app with Client-Side Routing replace '/' with '/*' 
app.get('/', (req, res) => {
   res.sendFile(path.join(dirname, 'build', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`server run on ${HOST}:${PORT}`);
});