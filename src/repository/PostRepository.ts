import { PostBoard } from "entity/post";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PostBoard)
export class PostRepository extends Repository<PostBoard> {

}