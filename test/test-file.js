import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import { createFile, deleteFile } from './test-helper';
import { sizeGuard, extGuard } from '../src/file-guard';

describe('The integrity of the files', () => {
  const fileName = path.resolve(__dirname, 'test.txt');
  const rows = "My first rowzzs\nSecond frow\n";

  it('Should be return true if UNDER the specified size', () => {
    const size = createFile(fileName, rows);
    const result = sizeGuard(fileName, size);
    expect(result).to.equal(true);
  });

  it('Should be return false if OVER the specified size', () => {
    const size = createFile(fileName, rows);
    const result = sizeGuard(fileName, size - 1);
    expect(result).to.equal(false);
  });

  it('Should be return false if NOT a TXT file', () => {
    const wrongFile = path.resolve(__dirname, 'test.html');
    const result = extGuard(wrongFile);
    expect(result).to.equal(false);
  });

  it('Should be return true if a TXT file', () => {
    const result = extGuard(fileName);
    expect(result).to.equal(true);
  });

  afterEach(() => {
    deleteFile(fileName);
  });
});
