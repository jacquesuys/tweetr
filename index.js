#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import inquirer from 'inquirer';
import emoji from 'node-emoji';

// src modules
import { parseTweets } from './src/parse-tweets';
import { parseUsers } from './src/parse-users';

let size, tweetsParsed, usersParsed, outputData;

// Start screen
const startScreen = () => {
  clear();
  console.log(
    chalk.cyan(
      figlet.textSync('TweetR', { horizontalLayout: 'full' })
    )
  );
  console.log(`\tPress ${chalk.cyan('ctrl + C')} to quit\n`);
}

const init = () => {
  startScreen();

  var questions = [
    {
      name: 'size',
      type: 'input',
      message: `Specify file limit in BYTES (500b default) ${emoji.emojify(':gear:')} \n`,
      validate: (value) => {
        if ( isNaN(value) ) return "Enter a valid number";
        size = value;
        return true;
      }
    },
    {
      name: 'users',
      type: 'input',
      message: `Type in the location of the user (.txt) file ${emoji.emojify(':pencil:')}\n`,
      validate: (value) => {
        usersParsed = parseUsers(value, size);

        return typeof usersParsed !== 'string' ? true : emoji.emojify(usersParsed);
      }
    },
    {
      name: 'tweets',
      type: 'input',
      message: `Type in the location of the tweets (.txt) file ${emoji.emojify(':pencil:')}\n`,
      validate: (value) => {
        tweetsParsed = parseTweets(value, size);

        return typeof tweetsParsed !== 'string' ? true : emoji.emojify(tweetsParsed);
      }
    }
  ];

  inquirer.prompt(questions).then(tweetScreen);
}

const tweetScreen = () => {
  outputData = '';
  
  console.log('\n');
  
  for (const user in usersParsed) {
    outputData += `${user}:\n`;

    console.log(
      chalk.red(`${user}:`)
    );
    tweetsParsed.forEach(tweet => {
      const tweeter = tweet[0];
      if (user === tweeter || usersParsed[user].has(tweeter)) {
        console.log(chalk.cyan(`\t@${tweeter}`) + `: ${emoji.emojify(tweet[1])}`);
        outputData += `\t@${tweeter}: ${tweet[1]}\n`;
      }
    });
  }

  console.log('\n');

  var question = [
    {
      name: 'save',
      type: 'confirm',
      message: `Save File ${emoji.emojify(':floppy_disk:')}`,
      validate: (value) => value
    },
    {
      name: 'file',
      type: 'input',
      message: `Type in the name of file ${emoji.emojify(':pencil:')} (.txt)\n`,
      when: (answers) => answers.save,
      validate: (value) => {
        saveFile(value);
        return true;
      }
    }
  ];

  inquirer.prompt(question).then(endSreen);
}

const saveFile = (name = 'output') => {
  
  const dir = path.resolve(__dirname, 'tweets');
  if ( !fs.existsSync(dir) ) fs.mkdirSync(dir);
  
  fs.writeFileSync(`${dir}/${name}.txt`, outputData);
}

const endSreen = () => {
  
  console.log(`\n\nGoodbye ${emoji.emojify(':wave:')}${emoji.emojify(':wave:')}`);

  setTimeout(() => {
    clear();
  }, 2000);
}

init();
