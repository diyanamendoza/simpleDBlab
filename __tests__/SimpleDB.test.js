//imports 
const { mkdir, rm } = require('fs/promises');
// const { get } = require('http');
const SimpleDB = require('../SimpleDB.js');

describe('SimpleDB', () => {
  //any constants relevant to all tests
  const rootDir = './__tests__/store';
    
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

    const fileAfter = {
      id: expect.any(String),
      name: 'gloria',
      role: 'grandma'
    };

    // const dirContents = readdir(rootDir);


    return db1
      .save(fileBefore)
      .then(() => db1.get(fileBefore.id))
    //   .then((id) => get(id))
      .then((receivedFile) => expect(receivedFile).toEqual(fileAfter));
    //   .then(() => expect(dirContents).toBeTruthy());
  });
  //save and get test

  //null test

  //get all test

  //delete test

  //update test


});
