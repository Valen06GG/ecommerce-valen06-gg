import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { MinSizeValidatorPipe } from "src/pipes/min-size-validator.pipe";

@Controller("files")
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post("uploadImage/:id") 
    @UseInterceptors(FileInterceptor("file"))
    @UsePipes(MinSizeValidatorPipe)
    uploadImage(@Param("id") id: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 3000000,
          message: "El tamaño del archivo es demasiado grande. El tamaño máximo permitido es 3MB."
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/,
        }),
      ],
    }),
  ) file: Express.Multer.File) {
        return this.filesService.uploadImage(id, file);
    }
}