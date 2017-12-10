import fs from 'fs';
import { sizeGuard, extGuard } from '../src/file-guard';

export const parseUsers = (file, limit = 72, delimiter = '\n') => {
  // ^ TODO: maybe destructure above params
  if (fs.existsSync(file)) {
    if (extGuard(file)) {
      if (sizeGuard(file, limit)) {
        let data = fs.readFileSync(file, 'utf8', (err, data) => data);

        // TODO: add regex test for each row
        // TODO: return failures
        
        const result = data.split(delimiter)
          // filter out any empty strings, from delimiters
          .filter(str => str.length)
          .map(row => {
            return row.split(' ')
              .filter(word => word !== 'follows')
              // get rid of any trailing commas
              .map(word => word.replace(/\,/, ''));
          })
          .reduce((obj, row) => {
            obj[ row[0] ] = new Set([...row.slice(1)]);
            return obj;
          }, {});

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