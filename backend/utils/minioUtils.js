import fs from 'fs';
import initMinioClient from '../config/minio.js';
import { Duplex } from 'stream';


const minioClient = initMinioClient();

async function uploadFileFromEndpoint(bucketName, objectName, file) {
    try {
        // Check if the bucket exists
        const bucketExists = await minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            await minioClient.makeBucket(bucketName, ''); // Specify your region
            console.log(`Bucket created: ${bucketName}`);
        }

        // Read the file from the file system
        const fileStream = bufferToStream(file.buffer);
        const fileStat = file.size;

        await minioClient.putObject(bucketName, objectName, fileStream, fileStat);
        console.log(`File uploaded successfully. Bucket: ${bucketName}, Object: ${objectName}`);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

// Helper function to convert buffer to stream
const bufferToStream = (buffer) => {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  };

export {uploadFileFromEndpoint};
