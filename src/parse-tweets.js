import fs from 'fs';
import { sizeGuard, extGuard } from '../src/file-guard';

export const parseTweets = (file, limit = 1000, delimiter = '\n') => {
  if (fs.existsSync(file)) {
    if (extGuard(file)) {
      if (sizeGuard(file, limit)) {

        const data = fs.readFileSync(file, 'utf8', (err, data) => data);

        // TODO: add regex test for each row
        // TODO: return failures

        const result = data.split(delimiter)
          // filter out any empty strings, from delimiters
          .filter(str => str.length)
          .map(row => row.split('> '));

        return result;
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