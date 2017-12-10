import fs from 'fs';
import path from 'path';
import { assert, expect } from 'chai';
import { createFile, deleteFile, makePath } from './test-helper';
import { parseTweets } from '../src/parse-tweets';

describe('The integrity of the tweets file', () => {
  const rows = [
    'Alan> If you have a procedure with 10 parameters, you probably missed some.\n',
    'Ward> There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors.\n',
    'Alan> Random numbers should not be generated with a method chosen at random.'
  ].join('');

  let fileName, wrongFile, size;

  beforeEach(() => {
    fileName = makePath('tweets.txt');
    wrongFile = makePath('test.html');
    size = createFile(fileName, rows);
  });

  it('Should return error if file doesn\'t exist', () => {
    const result = parseTweets(wrongFile);
    expect(result).to.equal('File doesn\'t exist');
    deleteFile(wrongFile);
  });

  it('Should return error if file extension is incorrect', () => {
    createFile(wrongFile, rows);

    const result = parseTweets(wrongFile);
    expect(result).to.equal('Must be a .txt file');
    deleteFile(wrongFile);
  });

  it('Should return an error when OVER the size limit', () => {
    const result = parseTweets(fileName , 1);
    expect(result).to.equal('File exceeds the limit');
  });

  it('Should return an array with rows of names and tweets', () => {
    const result = parseTweets(fileName);
    expect(result).to.be.an('array');
  });

  afterEach(() => {
    deleteFile(fileName);
  });
});
