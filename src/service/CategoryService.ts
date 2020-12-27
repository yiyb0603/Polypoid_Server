import { Injectable } from "@nestjs/common";
import { Category } from "entity/category";
import { CategoryDto } from "entity/dto/Category.dto";
import HttpError from "exception/HttpError";
import { CategoryRepository } from "repository/CategoryRepository";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async getCategoryByIdx(idx: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({
      where: {
        idx,
      },
    });

    if (!category) {
      throw new HttpError(404, "존재하지 않는 카테고리 입니다.");
    }

    return category;
  }

  public async getCategoryByName(name: string): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    return category;
  }

  public async getCategories(): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository.find({
      select: [
        'idx',
        'name'
      ],
    });

    return categories;
  }

  public async createCategory(request: CategoryDto): Promise<void> {
    const { name } = request;

    const existCategory: Category = await this.getCategoryByName(name);
    if (existCategory) {
      throw new HttpError(409, '이미 존재하는 카테고리 입니다.');
    }

    const category: Category = new Category();
    category.name = name;
    await this.categoryRepository.save(category);
  }

  public async modifyCategory(idx: number, name: string): Promise<void> {
    const category: Category = await this.getCategoryByIdx(idx);

    category.idx = idx;
    category.name = name;
    await this.categoryRepository.save(category);
  }

  public async deleteCategory(idx: number): Promise<void> {
    const category: Category = await this.getCategoryByIdx(idx);

    await this.categoryRepository.remove(category);
  }
}