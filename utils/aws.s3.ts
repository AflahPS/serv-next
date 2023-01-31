import crypto from "crypto";
import { promisify } from "util";
import AWS from "aws-sdk";
const randomBytes = promisify(crypto.randomBytes);

const nameGenerator = async () => {
  const rawBytes = await randomBytes(16);
  return rawBytes.toString("hex");
};

async function uploadImageToS3(image: File) {
  const randomString = await nameGenerator();
  const extension = image.type.split("/")[1];
  const imageName = `${randomString}.${extension}`;

  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET,
  });

  // Create an S3 client
  const s3 = new AWS.S3();

  // Set the parameters for the upload
  const params = {
    Bucket: "hire-one",
    Key: imageName,
    Body: image,
    // ContentType: image.type,
    // ACL: "public-read",
  };

  // Perform the upload
  return s3
    .upload(params)
    .promise()
    .then((data) => {
      // Return the URL of the uploaded image
      return data.Location;
    })
    .catch((err) => {
      console.error(err);
    });
}

export const uploadImages = async (images: (File | string)[]) => {
  const uploadedUrls = [];
  for (let i = 0; i < images.length; i++) {
    let uploaded;
    if (images[i] instanceof File) {
      uploaded = await uploadImageToS3(images[i] as File);
    } else {
      uploaded = images[i];
    }
    uploadedUrls.push(uploaded);
  }
  return uploadedUrls;
};
