import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { createFile, deleteFile, makePath } from './test-helper';
import { sizeGuard, extGuard } from '../src/file-guard';

describe('The integrity of the files', () => {
  let fileName, size;
  const rows = "My first rowzzs\nSecond frow\n";

  beforeEach(() => {
    fileName = makePath('users.txt');
    size = createFile(fileName, rows);
  });

  it('Should return true if UNDER the specified size', () => {
    const result = sizeGuard(fileName, size);
    expect(result).to.equal(true);
  });

  it('Should return false if OVER the specified size', () => {
    const result = sizeGuard(fileName, size - 1);
    expect(result).to.equal(false);
  });

  it('Should return false if NOT a TXT file', () => {
    const wrongFile = makePath('test.html');
    const result = extGuard(wrongFile);
    expect(result).to.equal(false);
    deleteFile(wrongFile);
  });

  it('Should return true if a TXT file', () => {
    const result = extGuard(fileName);
    expect(result).to.equal(true);
  });

  afterEach(() => {
    deleteFile(fileName);
  });
});
