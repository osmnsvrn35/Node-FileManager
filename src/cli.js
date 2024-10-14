import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';
import { up, cd, ls } from './navigation.js';
import { cat, add,rn,cp,mv } from './fileOperations.js';

export function extractUsername() {
  const args = process.argv.slice(2);
  let username = 'anonymous user';

  for (const arg of args) {
    if (arg.startsWith('--username=')) {
      username = arg.split('=')[1];
    }
  }

  return username;
}

export function startCLI(username) {
  const rl = readline.createInterface({ input, output });

  const homeDirectory = os.homedir();
  process.chdir(homeDirectory); 

  rl.setPrompt('> ');

  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${process.cwd()}`);

  rl.prompt();

  rl.on('line', async (userInput) => {
    const trimmedInput = userInput.trim();
    const [command, ...args] = trimmedInput.split(' ');

    try {
      if (command === '.exit') {
        await exitHandler(rl, username);
      } 
      else if (command === 'up') {
        await up();
      } 
      else if (command === 'cd' && args[0]) {
        await cd(args[0]);
      } 
      else if (command === 'ls') {
        await ls();
      } 
      else if (command === 'cat' && args[0]) {
        await cat(args[0]);
      } 
      else if (command === 'add' && args[0]) {
        await add(args[0]);
      } 
      else if (command === 'rn' && args[0] && args[1]) {
        await rn(args[0],args[1]);
      }
      else if (command === 'cp' && args[0] && args[1]) {
        await cp(args[0], args[1]); 
      }
      else if (command === 'mv' && args[0] && args[1]) {
        await mv(args[0], args[1]); 
      }
      else {
        console.log('Invalid input');
      }
    } 
    catch (error) {
      
      console.error(`Operation failed`);
    }

    console.log(`You are currently in ${process.cwd()}`);
    rl.prompt();
  });

  process.on('SIGINT', async () => {
    await exitHandler(rl, username);
  });
}

async function exitHandler(rl, username) {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  rl.close();
  process.exit(0);
}
