//imports 
const { mkdir, rm } = require('fs/promises');
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
  //id test
  it('should give the saved object an id', () => {
    const db1 = new SimpleDB(rootDir);
    const fileBefore = {
      name: 'gloria',
      role: 'grandma'
    };
    const fileAfter = {
      id: expect.any(Number),
      name: 'gloria',
      role: 'grandma'
    };

    return db1
      .save(fileBefore)
      .then((savedFile) => JSON.parse(savedFile))
      .then((parsedSavedFile) => expect(parsedSavedFile).toEqual(fileAfter));
  });
  //save and get test

  //null test

  //get all test

  //delete test

  //update test


});
