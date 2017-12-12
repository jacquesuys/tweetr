# tweetr
A command-line compiler of tweets. **Now supports emojis.**

Find the files named **user.txt** and **tweet.txt** for the correct format of each data set.

Install [Node.js®][node] and [npm][npm] if they are not already on your machine.

### Install
```
npm install
```

### Test
```
npm test
```

### Run app
```
npm start
```
## Usage:
This outlines the structure of the **user.txt** and **tweet.txt** files.

### user.txt
```
Ward follows Alan
Alan follows Martin
Ward follows Martin, Alan
```

### tweet.txt
**!!** Tweets have a **140 character** limit.
```
Alan> TweetR is a tweet compiler for CLI that now supports emojis :trophy:
Ward> There are only two hard things in Computer Science: cache invalidation, naming things and off-by-1 errors.
Alan> Random numbers should not be generated with a method chosen at random.
```
## Emojis:
See [example][emoji] for all the emojis.

[node]: https://nodejs.org/en/download/
[npm]: https://github.com/npm/npm#super-easy-install
[emoji]: https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json