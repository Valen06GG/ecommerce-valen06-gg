import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { FilesRepository } from "./files.repository";
import { Products } from "../products/products.entity";
import { CloudinaryConfig } from "../config/cloudinary";

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FilesController],
  providers: [
    FilesService,
    FilesRepository,
    CloudinaryConfig,
  ],
})
export class FilesModule {}