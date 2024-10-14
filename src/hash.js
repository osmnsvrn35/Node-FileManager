import { promises as fsPromises } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'path';

export async function calculateHash(filePath) {
   
    const absoluteFilePath = path.resolve(process.cwd(), filePath);
    const fileContent = await fsPromises.readFile(absoluteFilePath);
    
    const hash = createHash('sha256');
    hash.update(fileContent);
    const fileHash = hash.digest('hex');
    console.log(`${fileHash}`);
  }