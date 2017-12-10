import fs from 'fs';

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

export { createFile, deleteFile };