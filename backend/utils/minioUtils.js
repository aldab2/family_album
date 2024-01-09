import fs from 'fs';
import initMinioClient from '../config/minio.js';
import { Duplex } from 'stream';


const minioClient = initMinioClient();
const BUCKET_NAME = "posts-gallery"
async function uploadFileFromEndpoint(familyId,userName, postId, filename, file) {
    // Construct the object name with directory structure
    const objectName = `${familyId}/${userName}/${postId}/${filename}`;

    try {
        // Check if the bucket exists
        const bucketExists = await minioClient.bucketExists(BUCKET_NAME);
        if (!bucketExists) {
            await minioClient.makeBucket(BUCKET_NAME, ''); // Specify your region
            console.log(`Bucket created: ${BUCKET_NAME}`);
        }

        // Read the file from the file system
        const fileStream = bufferToStream(file.buffer);
        const fileStat = file.size;

        await minioClient.putObject(BUCKET_NAME, objectName, fileStream, fileStat);
        console.log(`File uploaded successfully. Bucket: ${BUCKET_NAME}, Object: ${objectName}`);
        return true;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error(error);
    }
}

async function deleteMediaForPost(familyId,userName, postId, filenames) {
    // Construct the object name with directory structure

    const objectList = filenames.map(filename =>{
        return `${familyId}/${userName}/${postId}/${filename}`;
    })

    try {


        await minioClient.removeObjects(BUCKET_NAME, objectList);
        console.log(`Files removed sucessully. Bucket: ${BUCKET_NAME}, Objects: ${objectList}`);
        return true;
    } catch (error) {
        console.error('Error removing files:', error);
        throw new Error(error);
    }
}

const getPresignedUrl = async (familyId, userName, postId, resourceId) => {
    const objectName = `${familyId}/${userName}/${postId}/${resourceId}`;
    const expiry = 24 * 60 * 60; // URL expiry time in seconds, e.g., 24 hours
    try {
        return await minioClient.presignedGetObject(BUCKET_NAME, objectName, expiry);
    } catch (error) {
        throw new Error(error);
    }
};

// Helper function to convert buffer to stream
const bufferToStream = (buffer) => {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  };

export {uploadFileFromEndpoint, getPresignedUrl,deleteMediaForPost};
