import fs from 'fs';
import { sizeGuard, extGuard } from '../src/file-guard';
import msg from './messages';

export const parseUsers = (file, limit = 1000, delimiter = '\n') => {
  if (fs.existsSync(file)) {
    if (extGuard(file)) {
      if (sizeGuard(file, limit)) {
        let data = fs.readFileSync(file, 'utf8', (err, data) => data);

        data = data.split('\n')
          // filter out any empty strings, from delimiters
          .filter(str => str.length);

        const regx = /\w+\sfollows\s\w+(,\s\w+)?/;
        const sequence = data.map(a => regx.test(a)).every(e => e);

        if (!sequence) return msg.structure_u;

        const result = data
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
        return msg.limit;
      }
    } else {
      return msg.type;
    }
  } else {
    return msg.exist;
  }
}