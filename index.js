import { extractUsername, startCLI} from './src/cli.js';

const username = extractUsername();
startCLI(username);
