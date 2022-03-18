//import aws from 'aws-sdk'
var aws = require('aws-sdk')
var dotenv = require('dotenv')
var fs = require('fs')
//import dotenv from 'dotenv'


dotenv.config()

const region = "us-east-1"
const bucketName ="etsyitemimages"
const accessKeyId=process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL(imgname){

    const imageName = imgname

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

module.exports = {generateUploadURL: generateUploadURL};