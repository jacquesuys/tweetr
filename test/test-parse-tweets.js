import fs from 'fs';
import path from 'path';
import { assert, expect } from 'chai';
import { createFile, deleteFile, makePath } from './test-helper';
import { parseTweets } from '../src/parse-tweets';
import msg from '../src/messages';

describe('The integrity of the tweets file', () => {
  const rows = [
    'Alan> If you have a procedure with 10 parameters, you probably missed some.\n',
    'Ward> There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors.\n',
    'Alan> Random numbers should not be generated with a method chosen at random.'
  ].join('');

  let fileName, wrongFile, size;

  const longTweet = [
    "Alan> All tweets should be less than 140 characters....",
    "All tweets should be less than 140 characters....",
    "All tweets should be less than 140 characters...."
  ].join('');

  const wrongTweet = "This is just wrong";

  beforeEach(() => {
    fileName = makePath('tweets.txt');
    wrongFile = makePath('test.html');
    size = createFile(fileName, rows);
  });

  it('Should return an error if file doesn\'t exist', () => {
    const result = parseTweets(wrongFile);
    expect(result).to.equal(msg.exist);
    deleteFile(wrongFile);
  });

  it('Should return an error if file extension is incorrect', () => {
    createFile(wrongFile, rows);

    const result = parseTweets(wrongFile);
    expect(result).to.equal(msg.type);
    deleteFile(wrongFile);
  });

  it('Should return an error when OVER the size limit', () => {
    const result = parseTweets(fileName , 1);
    expect(result).to.equal(msg.limit);
  });

  it('Should return an error when it doesn\'t have a "USER> " prefix', () => {
    createFile(fileName, wrongTweet);
    const result = parseTweets(fileName);
    expect(result).to.equal(msg.structure_t);
  });

  it('Should return an error when the tweet is over 140 characters', () => {
    createFile(fileName, longTweet);
    const result = parseTweets(fileName);
    expect(result).to.equal(msg.length_t);
  });

  it('Should return an array with rows of names and tweets', () => {
    const result = parseTweets(fileName);
    expect(result).to.be.an('array');
  });

  afterEach(() => {
    deleteFile(fileName);
  });
});
