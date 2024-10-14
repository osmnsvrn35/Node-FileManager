import { stat, readFile, open, rename } from 'node:fs/promises';
import { EOL } from 'node:os';
import path from 'path';

export async function cat(filePath) {
    
    const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);
    const fileContent = await readFile(absolutePath, 'utf-8');
    process.stdout.write(fileContent + EOL);
    
}

export async function add(fileName) {
    const absolutePath = path.resolve(process.cwd(), fileName); 
    const fileHandle = await open(absolutePath, 'wx');
    await fileHandle.close();
}

export async function rn(oldPath, newFileName) {
  
    const absoluteOldPath = path.resolve(process.cwd(), oldPath);
    const newFilePath = path.resolve(path.dirname(absoluteOldPath), newFileName);
    await rename(absoluteOldPath, newFilePath);
  }