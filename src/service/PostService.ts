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

  public async getPosts(): Promise<PostBoard[]> {
    const posts: PostBoard[] = await this.postRepository.find({
      select: [
        'idx',
        'contents',
        'title',
        'writer_id',
        'writer_name',
      ],
    });

    return posts;
  }

  public async getPost(idx: number): Promise<PostBoard> {
    const post: PostBoard = await this.postRepository.findOne({
      where: {
        idx,
      },
    });

    if (!post) {
      throw new HttpError(404, '존재하지 않는 글입니다.');
    }

    return post;
  }

  public async createPost(request: PostDto): Promise<void> {
    const { categoryIdx, title, contents, writerId, writerName } = request;
    const category: Category = await this.categoryService.getCategoryByIdx(categoryIdx, '');

    const post: PostBoard = new PostBoard();
    post.category_idx = categoryIdx;
    post.category_name = category.name;
    post.title = title;
    post.contents = contents;
    post.writer_id = writerId;
    post.writer_name = writerName;
    await this.postRepository.save(post);
  }

  public async modifyPost(idx: number, request: PostDto): Promise<void> {
    const post: PostBoard = await this.getPost(idx);
    const { categoryIdx, title, contents, writerId, writerName } = request;

    post.category_idx = categoryIdx;
    post.title = title;
    post.contents = contents;
    post.writer_id = writerId;
    post.writer_name = writerName;
    await this.postRepository.save(post);
  }

  public async deletePost(idx: number): Promise<void> {
    const post: PostBoard = await this.getPost(idx);
    await this.postRepository.remove(post);
  }
}