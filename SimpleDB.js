//imports
const { writeFile, readFile, readdir, rm, unlink } = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

//keep it classy
class SimpleDB {
  //constructor gadget  
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  //save one file
  save(file) {
    const id = shortid.generate();
    file.id = id; 
    const fileName = `${id}.json`;
    this.filePath = path.join(this.rootDir, fileName);
    this.stringyFile = JSON.stringify(file);

    return writeFile(this.filePath, this.stringyFile);
  }

  //save array of file objects
  async saveMany(files) {
    await Promise.all(
      files.map((file) => {
        const id = shortid.generate();
        file.id = id; 
        const fileName = `${id}.json`;
        this.filePath = path.join(this.rootDir, fileName);
        this.stringyFile = JSON.stringify(file);
    
        return writeFile(this.filePath, this.stringyFile);
      }));
  }

  //get by id
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
  async getAll() {
    const contentsArray = await readdir(this.rootDir);
    const parsedContents = await Promise.all(
      contentsArray.map((file) => 
        readFile(`${this.rootDir}/${file}`, 'utf-8')
          .then((fileContents) => JSON.parse(fileContents))
          .catch((err) => {
            if (err.code === 'ENOENT') {
              return null;
            }
            throw err;
          })
      ));
    return parsedContents;
  }

  //   delete by id
  async removeFile(id) {
    try {
      this.filePath = path.join(this.rootDir, `${id}.json`);
      await unlink(this.filePath);
      console.log(`${this.filePath} was deleted`);
    }
    catch (err) {
      if (err) console.log(err);
    }
  }

  // second version of delete by id
  async rmFile(id) {
    this.filePath = path.join(this.rootDir, `${id}.json`);
    return rm(this.filePath, { force: true });
  }

}

module.exports = SimpleDB;
