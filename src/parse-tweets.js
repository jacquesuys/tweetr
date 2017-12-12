import fs from 'fs';
import { sizeGuard, extGuard } from '../src/file-guard';
import msg from './messages';

export const parseTweets = (file, limit = 1000, delimiter = '\n') => {
  if (fs.existsSync(file)) {
    if (extGuard(file)) {
      if (sizeGuard(file, limit)) {

        let data = fs.readFileSync(file, 'utf8', (err, data) => data);

        data = data.split(delimiter)
          // filter out any empty strings, from delimiters
          .filter(str => str.length);

        // test starts w "WORD> "
        const regx = /^\w+>\s/;
        const sequence = data.map(m => regx.test(m)).every(e => e);

        if (!sequence) return msg.structure_t;
        
        data = data.map(row => row.split('> '));

        // test length
        const lengths = data.map(m => m[1].length).every(e => e <= 140);
        if (!lengths) return msg.length_t;

        return data;
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
