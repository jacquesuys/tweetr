import fs from 'fs';
import path from 'path';

const sizeGuard = (file, limit = 72) => {
  const fileSize = fs.statSync(file).size; // file size in bytes
  return fileSize <= limit; 
}

const extGuard = file => path.extname(file).toLowerCase() === '.txt';

export { sizeGuard, extGuard };
