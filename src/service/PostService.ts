import { Injectable } from "@nestjs/common";
import { Category } from "entity/category";
import { PostDto } from "entity/dto/Post.dto";
import { PostBoard } from "entity/post";
import HttpError from "exception/HttpError";
import IPostRepository from "interface/post";
import { PostRepository } from "repository/PostRepository";
import { CategoryService } from "./CategoryService";

@Injectable()
export class PostService implements IPostRepository {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoryService: CategoryService,
  ) {}

  public async getPosts(id: string): Promise<PostBoard[]> {
    const posts: PostBoard[] = await this.postRepository.find({
      select: [
        'idx',
        'contents',
        'title',
        'writer_id',
        'writer_name',
        'created_at',
        'updated_at',
      ],

      where: {
        writer_id: id,
      },

      order: {
        created_at: 'DESC',
      },
    });

    return posts;
  }

  public async getPost(idx: number, id: string): Promise<PostBoard> {
    const post: PostBoard = await this.postRepository.findOne({
      where: {
        idx,
        writer_id: id,
      },
    });

    if (!post) {
      throw new HttpError(404, '존재하지 않는 글입니다.');
    }

    return post;
  }

  public async createPost(request: PostDto, token: any): Promise<void> {
    const { title, contents } = request;
    // const category: Category = await this.categoryService.getCategoryByIdx(categoryIdx, '');

    const post: PostBoard = new PostBoard();
    // post.category_idx = categoryIdx;
    // post.category_name = category.name;
    post.title = title;
    post.contents = contents;
    post.writer_id = token.id;
    post.writer_name = token.name;
    post.created_at = new Date();
    post.updated_at = null;
    await this.postRepository.save(post);
  }

  public async modifyPost(idx: number, request: PostDto, token: any): Promise<void> {
    const post: PostBoard = await this.getPost(idx, token.id);
    const { title, contents } = request;

    // post.category_idx = categoryIdx;
    post.title = title;
    post.contents = contents;
    post.writer_id = token.id;
    post.writer_name = token.name;
    post.updated_at = new Date();
    await this.postRepository.save(post);
  }

  public async deletePost(idx: number, id: string): Promise<void> {
    const post: PostBoard = await this.getPost(idx, id);
    await this.postRepository.remove(post);
  }
}