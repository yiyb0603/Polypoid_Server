import { Category } from "entity/category";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

}