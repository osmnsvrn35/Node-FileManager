// index.js (ESM module because "type": "module" in package.json)

import os from 'os';

// Helper function to log the welcome message
function logWelcomeMessage(username = 'anonymous user') {
  console.log(`Welcome to the File Manager, ${username}!`);
}

// Get command-line arguments
// Since we're using `npm run`, the arguments start from a later position
const args = process.argv.slice(2); // This skips 'node' and the script path itself

// Initialize username variable
let username = '';

// Parse the CLI argument for --username
args.forEach(arg => {
  if (arg.startsWith('--username=')) {
    username = arg.split('=')[1]; // Extract the username value after '='
  }
});

// Call the log function with the username or default value
logWelcomeMessage(username);
