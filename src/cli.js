import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import os from 'os';

// Extract the username from CLI arguments
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

// Start the CLI and handle user input
export function startCLI(username) {
  const rl = readline.createInterface({ input, output });

  // Change the working directory to the user's home directory
  const homeDirectory = os.homedir();
  process.chdir(homeDirectory);

  // Set the prompt to '>'
  rl.setPrompt('> ');

  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${process.cwd()}`);

  rl.prompt();

  rl.on('line', async (userInput) => {
    if (userInput.trim() === '.exit') {
      await exitHandler(rl, username);
    } else {
      console.log(`You entered: ${userInput}`);
      console.log(`You are currently in ${process.cwd()}`);
      rl.prompt();
    }
  });

  process.on('SIGINT', () => {
    exitHandler(rl, username);
  });
}


function exitHandler(rl, username) {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  rl.close();
  process.exit(0);
}
