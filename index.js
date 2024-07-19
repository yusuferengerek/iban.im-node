const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { port } = require('./src/config.json').app;
const app = express();
global.app = app;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// HANDLERS INIT
const files = fs.readdirSync(path.join(__dirname, 'src', 'handlers'));
for(const file of files){
  try{
    require(path.join(__dirname, 'src', 'handlers', file));
    console.log(`(${file}) Handler loaded.`);
  }catch (err){
    console.error(`(\\handlers\\${file}) There is an error. "${err}"`);
  }
}

// exressjs server init
const server = app.listen(port, function(){
  console.log(`Server started at ${server.address().port} port.`);
});