import { v2 } from "cloudinary";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env.development" });

export const CloudinaryConfig = {
  provide: "CLOUDINARY",
  useFactory: () => {
        console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
        console.log("API Key:", process.env.CLOUDINARY_API_KEY);
        console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return v2; 
  },
};