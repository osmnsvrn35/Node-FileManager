import { EOL,cpus as osCpus,homedir,arch,userInfo } from 'node:os';

export function printEOL() {
    console.log(`End-Of-Line (EOL) character(s): ${JSON.stringify(EOL)}`);
}

export function printCpus() {
    const cpuInfo = osCpus();
    console.log('CPUs:');
    cpuInfo.forEach((cpu, index) => {
      console.log(`  CPU ${index + 1}: ${cpu.model} (${(cpu.speed / 1000).toFixed(2)} GHz)`);
    });
}

export function printHomeDir() {
    console.log(`Home Directory: ${homedir()}`);
}

export function printUsername() {
    const user = userInfo();
    console.log(`System username: ${user.username}`);
} 

export function printArchitecture() {
    console.log(`Architecture: ${arch()}`);
} 

export function handleOsCommand(osCommand, username) {
    switch (osCommand) {
      case '--EOL':
        printEOL();
        break;
      case '--cpus':
        printCpus();
        break;
      case '--homedir':
        printHomeDir();
        break;
      case '--username':
        printUsername();
        break;
      case '--architecture':
        printArchitecture();
        break;
      default:
        console.log('Invalid input');
    } 
}
