import { createReadStream, createWriteStream } from 'node:fs';
import { promises as fsPromises } from 'node:fs'; 
import { parse, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';



export async function compress(sourceFilePath, destinationPath) {
    const absoluteSourcePath = resolve(process.cwd(), sourceFilePath);
    const absoluteDestinationPath = resolve(process.cwd(), destinationPath);
   
    await fsPromises.access(absoluteSourcePath);

    const { name } = parse(absoluteSourcePath);
    const compressedFilePath = resolve(absoluteDestinationPath, `${name}.br`);

    const sourceStream = createReadStream(absoluteSourcePath);
    const destinationStream = createWriteStream(compressedFilePath);
    const brotliCompress = createBrotliCompress();
    
    await pipeline(sourceStream, brotliCompress, destinationStream);
    
  }


  export async function decompress(sourceFilePath, destinationPath) {
    const absoluteSourcePath = resolve(process.cwd(), sourceFilePath);
    const absoluteDestinationPath = resolve(process.cwd(), destinationPath);
    
    await fsPromises.access(absoluteDestinationPath);
    const { name } = parse(absoluteSourcePath);
    const decompressedFilePath = resolve(absoluteDestinationPath, name);

    const sourceStream = createReadStream(absoluteSourcePath);
    const destinationStream = createWriteStream(decompressedFilePath);
    const brotliDecompress = createBrotliDecompress();
  
    await pipeline(sourceStream, brotliDecompress, destinationStream);
      
    
  }