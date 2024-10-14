import path from 'path';
import { promises as fsPromises } from 'fs';
import { cwd, chdir } from 'process';

export async function up() {
      const currentDir = cwd(); 
      const parentDir = path.dirname(currentDir);  
      await fsPromises.access(parentDir); 
      chdir(parentDir); 
}

export async function cd(targetDir) {
    const currentDir = cwd();
    const targetPath = path.isAbsolute(targetDir)
      ? targetDir 
      : path.resolve(currentDir, targetDir);
    await fsPromises.access(targetPath);
    chdir(targetPath);
} 
 
  
