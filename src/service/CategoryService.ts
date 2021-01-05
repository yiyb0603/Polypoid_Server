import { Injectable } from "@nestjs/common";
import { Category } from "entity/category";
import { CategoryDto } from "entity/dto/Category.dto";
import HttpError from "exception/HttpError";
import { CategoryRepository } from "repository/CategoryRepository";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async getCategoryByIdx(idx: number, userId: string): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({
      where: {
        idx,
        user_id: userId,
      },
    });

    if (!category) {
      throw new HttpError(404, "존재하지 않는 카테고리 입니다.");
    }

    return category;
  }

  public async getCategoryByName(userId: string, name: string): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({
      where: {
        name,
        user_id: userId,
      },
    });

    return category;
  }

  public async getCategories(userId: string): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository.find({
      select: [
        'idx',
        'name'
      ],
      where: {
        user_id: userId,
      }
    });

    return categories;
  }

  public async createCategory(userId: string, request: CategoryDto): Promise<void> {
    const { name } = request;

    const existCategory: Category = await this.getCategoryByName(userId, name);
    if (existCategory) {
      throw new HttpError(409, '이미 존재하는 카테고리 입니다.');
    }

    const category: Category = new Category();
    category.name = name;
    category.user_id = userId;
    await this.categoryRepository.save(category);
  }

  public async modifyCategory(userId: string, idx: number, request: CategoryDto): Promise<void> {
    const category: Category = await this.getCategoryByIdx(idx, userId);

    category.idx = idx;
    category.name = request.name;
    category.user_id = userId;
    await this.categoryRepository.save(category);
  }

  public async deleteCategory(userId: string, idx: number): Promise<void> {
    const category: Category = await this.getCategoryByIdx(idx, userId);

    await this.categoryRepository.remove(category);
  }
}