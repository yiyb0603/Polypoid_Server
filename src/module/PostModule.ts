import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostRepository } from "../repository/PostRepository";
import { PostService } from "service/PostService";
import { PostController } from "controller/PostController";
import { CategoryService } from "service/CategoryService";
import { CategoryRepository } from "repository/CategoryRepository";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, PostRepository])],
  controllers: [PostController],
  providers: [PostService, CategoryService]
})
export class PostModule {}