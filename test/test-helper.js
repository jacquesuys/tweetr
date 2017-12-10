import fs from 'fs';
import path from 'path';

const createFile = (filePath, content) => {
  const stream = fs.createWriteStream(filePath);
  let size = 0;
  
  if (content) {
    fs.writeFileSync(filePath, content, 'utf8');
    size = fs.statSync(filePath).size;
  }

  return size;
}

const deleteFile = filePath => {
  if (fs.existsSync(filePath)) fs.unlink(filePath);
}

const makePath = fileName => path.resolve(__dirname, fileName);

export { createFile, deleteFile, makePath };