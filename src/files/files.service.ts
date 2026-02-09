import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { v2 as Cloudinary, UploadApiResponse } from "cloudinary";
import toStream from "buffer-to-stream";
import { FilesRepository } from "./files.repository";

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepo: FilesRepository,

    @Inject("CLOUDINARY")
    private readonly cloudinary: typeof Cloudinary,
  ) {}

  async uploadImage(productId: string,file: Express.Multer.File) {
    if (!file) throw new NotFoundException("No file uploaded");

    const result: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const upload = this.cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result);
          },
        );

        toStream(file.buffer).pipe(upload);
      },
    );

    return this.filesRepo.updateProductImage(productId,result.secure_url);
    }
}