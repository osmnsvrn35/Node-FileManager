import path from 'path';
import { promises as fsPromises } from 'fs';
import { cwd, chdir } from 'process';

export async function up() {
    
      const currentDir = cwd(); 
      const rootDir = path.parse(currentDir).root;  
      const parentDir = path.dirname(currentDir);  
      await fsPromises.access(parentDir); 
      chdir(parentDir); 
}
 
  
