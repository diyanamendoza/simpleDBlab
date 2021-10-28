//imports
const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

//constants 

//keep it classy
class SimpleDB {
  //constructor gadget  
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
  //save 
  save(file) {
    const id = shortid.generate();
    file.id = id; 
    const fileName = `${id}.json`;
    this.filePath = path.join(this.rootDir, fileName);
    this.stringyFile = JSON.stringify(file);

    return writeFile(this.filePath, this.stringyFile);
  }
  //get based on id - return null if !file
  get(id) {
    this.filePath = path.join(this.rootDir, `${id}.json`);
    const parsedFile = JSON.parse(readFile(this.filePath));
    return parsedFile; 
  }
  //get all as array w promise.all
  //   getAll() {

  //   }

}

module.exports = SimpleDB;
