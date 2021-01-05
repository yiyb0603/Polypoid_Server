import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, Headers, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Category } from "entity/category";
import { CategoryService } from "service/CategoryService";
import { handleSuccess } from 'lib/Response/handleSuccess';
import { CategoryDto } from 'entity/dto/Category.dto';
import { decodeToken } from 'lib/Token';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  public async getCategories(@Req() request: Request, @Res() response: Response) {
    const token: any = decodeToken(String(request.headers['polypoid-token']));
    const categories: Category[] = await this.categoryService.getCategories(token.id);
    
    handleSuccess(response, 200, '카테고리 목록을 조회하였습니다', { categories });
    return;
  }

  @Post('/')
  public async createCategory(@Headers() header, @Body() request: CategoryDto, @Res() response: Response) {
    const token: any = decodeToken(String(header['polypoid-token']));
    await this.categoryService.createCategory(token.id, request);

    handleSuccess(response, 200, '카테고리를 생성하였습니다');
    return;
  }

  @Put('/:idx')
  public async modifyCategory(@Headers() header, @Param('idx') idx: number, @Body() request: CategoryDto, @Res() response: Response) {
    const token: any = decodeToken(String(header['polypoid-token']));
    await this.categoryService.modifyCategory(token.id, idx, request);
    handleSuccess(response, 200, '카테고리를 수정하였습니다');
    return;
  }

  @Delete('/:idx')
  public async deleteCategory(@Headers() header, @Param('idx') idx: number, @Res() response: Response) {
    const token: any = decodeToken(String(header['polypoid-token']));
    const categoryIdx: number = Number(idx);

    await this.categoryService.deleteCategory(token.id, categoryIdx);
    handleSuccess(response, 200, '카테고리를 삭제 하였습니다');
    return;
  }
}