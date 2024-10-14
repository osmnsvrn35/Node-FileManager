import { stat, readFile } from 'node:fs/promises';
import { EOL } from 'node:os';
import path from 'path';

export async function cat(filePath) {
    
      const absolutePath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(process.cwd(), filePath);
      const fileContent = await readFile(absolutePath, 'utf-8');
      process.stdout.write(fileContent + EOL);
    
}