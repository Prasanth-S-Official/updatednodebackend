const fs = require('fs');
const { expect } = require('chai');
const { addData, displayData, writeDataToFile, readDataAndPrint } = require('../Week7Day1&2'); // Replace 'your-file-name' with the actual file name
const Sinon = require('sinon');

describe('Array Data Functions', () => {
  let dataArray;

  beforeEach(() => {
    dataArray = [];
  });

  it('should add user data to the array', () => {
    const userData = {
      name: 'John',
      email: 'john@example.com',
      phoneNo: '1234567890',
      password: 'securepassword',
      role: 'user',
    };

    addData(userData);

    expect(dataArray).to.have.lengthOf(1);
    expect(dataArray[0]).to.deep.equal(userData);
  });

  it('should display user data in the console', () => {
    const consoleSpy = Sinon.spy(console, 'log');

    const userData = {
      name: 'Alice',
      email: 'alice@example.com',
      phoneNo: '9876543210',
      password: 'anotherpassword',
      role: 'admin',
    };

    dataArray.push(userData);

    displayData();

    expect(consoleSpy.calledWith('Users in the array:')).to.be.true;
    expect(consoleSpy.calledWith(`1. ${JSON.stringify(userData)}`)).to.be.true;

    consoleSpy.restore();
  });
});

describe('File System Functions', () => {
  const testDataPath = 'testData.json';

  afterEach(() => {
    if (fs.existsSync(testDataPath)) {
      fs.unlinkSync(testDataPath);
    }
  });

  it('should write user data to a file', () => {
    const userData = {
      name: 'John',
      email: 'john@example.com',
      phoneNo: '1234567890',
      password: 'securepassword',
      role: 'user',
    };

    dataArray.push(userData);

    writeDataToFile();

    const fileData = fs.readFileSync(testDataPath, 'utf8');
    const parsedData = JSON.parse(fileData);

    expect(parsedData).to.have.lengthOf(1);
    expect(parsedData[0]).to.deep.equal(userData);
  });

  it('should read user data from a file and print in the console', () => {
    const consoleSpy = sinon.spy(console, 'log');

    const userData = {
      name: 'Alice',
      email: 'alice@example.com',
      phoneNo: '9876543210',
      password: 'anotherpassword',
      role: 'admin',
    };

    dataArray.push(userData);

    writeDataToFile();
    readDataAndPrint();

    expect(consoleSpy.calledWith('Read data from testData.json using streams:')).to.be.true;
    expect(consoleSpy.calledWith(`1. ${JSON.stringify(userData)}`)).to.be.true;

    consoleSpy.restore();
  });
});
