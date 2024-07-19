const path = require('path');
const fs = require('fs');

const files = fs.readdirSync(path.join('src', 'routes'));
for(const file of files){
  try{
    const { name, route } = require(path.join('..', 'routes', file));
    global.app.use(name, route);
    console.log(`(${file}) Route loaded.`);
  }catch(err){
    console.error(`(\\routes\\${file}) There is an error.`);
  }
}