import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "controller/CategoryController";
import { CategoryRepository } from "repository/CategoryRepository";
import { CategoryService } from "service/CategoryService";

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModules {}