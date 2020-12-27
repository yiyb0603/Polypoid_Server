import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Category } from "entity/category";
import { CategoryService } from "service/CategoryService";
import { disposeError } from 'lib/DisposeError';
import { handleSuccess } from 'lib/Response/handleSuccess';
import { CategoryDto } from 'entity/dto/Category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  public async getCategories(@Req() request: Request, @Res() response: Response) {
    try {
      const categories: Category[] = await this.categoryService.getCategories();
      
      handleSuccess(response, 200, '카테고리 목록을 조회하였습니다', { categories });
      return;
    } catch (error) {
      disposeError(error, response);
    }
  }

  @Post('/')
  public async createCategory(@Body() request: CategoryDto, @Res() response: Response) {
    try {
      await this.categoryService.createCategory(request);

      handleSuccess(response, 200, '카테고리를 생성하였습니다');
      return;
    } catch (error) {
      disposeError(error, response);
    }
  }

  @Put('/:idx')
  public async modifyCategory(@Param('idx') idx: string, @Req() name: string, @Res() response: Response) {
    try {
      const categoryIdx: number = Number(idx);

      await this.categoryService.modifyCategory(categoryIdx, name);
      handleSuccess(response, 200, '카테고리를 수정하였습니다');
      return;
    } catch (error) {
      disposeError(error, response);
    }
  }

  @Delete('/:idx')
  public async deleteCategory(@Param('idx') idx: number, @Res() response: Response) {
    try {
      const categoryIdx: number = Number(idx);

      await this.categoryService.deleteCategory(categoryIdx);
      handleSuccess(response, 200, '카테고리를 삭제 하였습니다');
      return;
    } catch (error) {
      disposeError(error, response);
    }
  }
}