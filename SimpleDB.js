//imports
const { writeFile, readFile } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

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


  async get(id) {
    try {
      this.filePath = path.join(this.rootDir, `${id}.json`);
      const file = await readFile(this.filePath, 'utf-8');
      const parsedFile = JSON.parse(file);
      return parsedFile;
    }
    catch (err) {
      if (err.code === 'ENOENT') {
        return null;
      }
      throw err;
    }
  }


  //get all as array w promise.all

  //   getAll() {

  //   }

}

module.exports = SimpleDB;
