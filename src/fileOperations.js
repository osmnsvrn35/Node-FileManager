import { stat, readFile, open, rename } from 'node:fs/promises';
import { EOL } from 'node:os';
import { createReadStream, createWriteStream } from 'node:fs';
import { promises as fsPromises } from 'node:fs';
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

export async function cp(sourcePath, destinationDir) {

    const absoluteSourcePath = path.resolve(process.cwd(), sourcePath);
  
    const absoluteDestinationDir = path.resolve(process.cwd(), destinationDir);
    await fsPromises.access(absoluteDestinationDir); 
  

    const destinationFilePath = path.join(absoluteDestinationDir, path.basename(absoluteSourcePath));
  
    if (absoluteSourcePath === destinationFilePath) {
      throw new Error("Source and destination paths are the same.");
    }
  
    const readableStream = createReadStream(absoluteSourcePath);
    const writableStream = createWriteStream(destinationFilePath);

    readableStream.pipe(writableStream);
  
    return new Promise((resolve, reject) => {
      writableStream.on('finish', resolve);
      writableStream.on('error', reject);  
      readableStream.on('error', reject);  
    });
  }