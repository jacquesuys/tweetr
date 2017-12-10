import fs from 'fs';
import { sizeGuard, extGuard } from '../src/file-guard';

export const parseUsers = (file, limit = 72, delimiter = '\n') => {
  // ^ maybe destructure above params
  if (fs.existsSync(file)) {
    if (extGuard(file)) {
      if (sizeGuard(file, limit)) {
        let users = fs.readFileSync(file, 'utf8', (err, data) => data);
        users = users.split(delimiter).filter(str => str.length); // filter out any empty strings
        
        return users;
      } else {
        return "File exceeds the limit";
      }
    } else {
      return "Must be a .txt file";
    }
  } else {
    return "File doesn\'t exist";
  }
}