//imports 
const { mkdir, rm } = require('fs/promises');
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
  //save and get test
  it('should save a file with an id', () => {
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
      .then((receivedFile) => expect(receivedFile).toEqual(fileAfter));
  });

  //null test
  it('should return null if there is no file', () => {
    const db2 = new SimpleDB(rootDir);
    return db2
      .get('fakeid')
      .then((result) => expect(result).toEqual(null));
  });


  //get from savemany
  it('should return an array of all files (parsed) that were saved in the directory', () => {
    const db4 = new SimpleDB(rootDir);
    const filesArray = [
      { name: 'gloria', role: 'grandma' },
      { name: 'portia', role: 'aunt' }
    ];

    const expectation = [
      { name: 'gloria', role: 'grandma', id: expect.any(String) },
      { name: 'portia', role: 'aunt', id: expect.any(String) }
    ];

    return db4
      .saveMany(filesArray)
      .then(() => db4.getAll())
      .then((received) => expect(received).toEqual(expect.arrayContaining(expectation)));
  });

  //delete test

  //update test


});
