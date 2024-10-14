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

export async function ls() {
    
    const currentDir = process.cwd();
    const items = await fsPromises.readdir(currentDir);
    const results = await Promise.all(
      items.map(async (item) => {
        const itemPath = path.join(currentDir, item);
        const stats = await fsPromises.stat(itemPath);
        return {
          name: item,
          type: stats.isDirectory() ? 'directory' : 'file',
        };
      })
    );
    const sortedResults = results.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name); 
      }
      return a.type === 'directory' ? -1 : 1; 
    });
    console.log('Index\tName\t\t\tType');
    sortedResults.forEach((item, index) => {
      console.log(`${index}\t${item.name}\t\t\t${item.type}`);
    });
   
  }
 
  
