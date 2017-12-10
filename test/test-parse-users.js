import fs from 'fs';
import path from 'path';
import { assert, expect } from 'chai';
import { createFile, deleteFile, makePath } from './test-helper';
import { parseUsers } from '../src/parse-users';

describe('The integrity of the users file', () => {
  const rows = [
    'Ward follows Alan\n',
    'Alan follows Martin\n',
    'Ward follows Martin, Alan'
  ].join('');

  const badSet = 'Ward follows Martin, Alan, Martin';

  let fileName, wrongFile, size;

  beforeEach(() => {
    fileName = makePath('users.txt');
    wrongFile = makePath('test.html');
    size = createFile(fileName, rows);
  });

  it('Should return error if file doesn\'t exist', () => {
    const result = parseUsers(wrongFile);
    expect(result).to.equal('File doesn\'t exist');
    deleteFile(wrongFile);
  });

  it('Should return error if file extension is incorrect', () => {
    createFile(wrongFile, rows);

    const result = parseUsers(wrongFile);
    expect(result).to.equal('Must be a .txt file');
    deleteFile(wrongFile);
  });

  it('Should filter away any empty delimiters', () => {
    const rows = [
      'Alan follows Martin\n',
      'Ward follows Martin, Alan\n'
    ].join('');

    createFile(fileName, rows);

    const result = parseUsers(fileName);
    expect(Object.keys(result).length).to.equal(2);
  });

  it('Should return an error when OVER the size limit', () => {
    const result = parseUsers(fileName, size - 1);
    expect(result).to.equal('File exceeds the limit');
  });

  it('Should return an object with names and followers', () => {
    const result = parseUsers(fileName);
    expect(result).to.be.an('object');
  });

  it('Should have followers as a unique Set', () => {
    createFile(fileName, badSet);
    const result = parseUsers(fileName);
    expect(result['Ward']).to.have.all.keys('Martin', 'Alan');
    assert.deepEqual(result['Ward'], new Set(['Martin', 'Alan', 'Martin']))
  });

  afterEach(() => {
    deleteFile(fileName);
  });
});
