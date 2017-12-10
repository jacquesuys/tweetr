// Test file contents

// Test positive scenario

import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { createFile, deleteFile, makePath } from './test-helper';
import { parseUsers } from '../src/parse-users';

describe('The integrity of the users file', () => {
  const rows = [
    'Ward follows Alan\n',
    'Alan follows Martin\n',
    'Ward follows Martin, Alan'
  ].join('');

  let fileName, wrongFile, size;

  beforeEach(() => {
    fileName = makePath('users.txt');
    wrongFile = makePath('test.html');
    size = createFile(fileName, rows);
  });

  it('Should be return error if file doesn\'t exist', () => {
    const result = parseUsers(wrongFile);
    expect(result).to.equal('File doesn\'t exist');
    deleteFile(wrongFile);
  });

  it('Should be return error if file extension is incorrect', () => {
    createFile(wrongFile, rows);

    const result = parseUsers(wrongFile);
    expect(result).to.equal('Must be a .txt file');
    deleteFile(wrongFile);
  });

  // xit('Should be return true if a TXT file', () => {
  //   const result = extGuard(fileName);
  //   expect(result).to.equal(true);
  // });

  it('Should be return an array if the file is valid', () => {
    const result = parseUsers(fileName);
    expect(result).to.be.an('array');
  });

  it('Should filter away any empty delimiters', () => {
    const rows = [
      'Ward follows Alan\n',
      'Alan follows Martin\n',
      'Ward follows Martin, Alan\n'
    ].join('');

    createFile(fileName, rows);

    const result = parseUsers(fileName);
    expect(result.length).to.equal(3);
  });

  it('Should be return an error when OVER the limit', () => {
    const result = parseUsers(fileName, size - 1);
    expect(result).to.equal('File exceeds the limit');
  });

  it('Should be return an array with contents', () => {
    const result = parseUsers(fileName);
    expect(result).to.be.an('array');
  });

  afterEach(() => {
    deleteFile(fileName);
  });
});
