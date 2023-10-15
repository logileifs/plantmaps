import { S3 } from "@aws-sdk/client-s3";

const SPACES_KEY = import.meta.env.VITE_ACCESS_KEY_ID
const SPACES_SECRET = import.meta.env.VITE_SECRET_ACCESS_KEY

const s3Client = new S3({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: "https://ams3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
      accessKeyId: SPACES_KEY,
      secretAccessKey: SPACES_SECRET
    }
});

export { s3Client };
