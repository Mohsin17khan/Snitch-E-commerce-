import ImageKit, { toFile } from '@imagekit/nodejs';
import { config } from '../config/config.js';

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadFiles({buffer, fileName, folderName = 'snitch'}){
 const result = await client.files.upload({ 
  file: await ImageKit.toFile(buffer),
  fileName,
  folderName
});

return result;
} 