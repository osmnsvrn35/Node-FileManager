import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';


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
    rl.setPrompt('> ');
    console.log(`Welcome to the File Manager, ${username}!`);
    console.log(`You are currently in ${process.cwd()}`);

    rl.on('line', async (userInput) => {
      if (userInput.trim() === '.exit') {
        await exitHandler(rl, username);
      }
      else{
        console.log(`You are currently in ${process.cwd()}`);
      }
    });

    rl.on('SIGINT', async () => {
      await exitHandler(rl, username);
    });
    process.on('SIGINT', () => {});
  }
  
  async function exitHandler(rl, username) {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    await rl.close();
    process.exit(0);
}
