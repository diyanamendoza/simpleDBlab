//imports 
const { mkdir, rm, readdir } = require('fs/promises');
const SimpleDB = require('../SimpleDB.js');

describe('SimpleDB', () => {
  //any constants relevant to all tests
  const rootDir = './__tests__/sampledb';
    
  //beforeEach stuff
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true })
      .then (() => mkdir(rootDir, { recursive: true }));
  }

  );
  //save test
  it('should save a file in rootDir', () => {
    const db1 = new SimpleDB(rootDir);
    const fileBefore = {
      name: 'gloria',
      role: 'grandma'
    };

    const dirContents = readdir(rootDir);


    return db1
      .save(fileBefore)
      .then(() => expect(dirContents).toBeTruthy());
  });
  //save and get test

  //null test

  //get all test

  //delete test

  //update test


});
