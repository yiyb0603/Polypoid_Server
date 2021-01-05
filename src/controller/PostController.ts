import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { PostBoard } from "entity/post";
import { PostService } from "service/PostService";
import { handleSuccess } from 'lib/Response/handleSuccess';
import { PostDto } from 'entity/dto/Post.dto';
import HttpError from 'exception/HttpError';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  public async getPosts(@Req() request: Request, @Res() response: Response) {
    const posts: PostBoard[] = await this.postService.getPosts();
    handleSuccess(response, 200, '글 목록을 조회하였습니다.', { posts });
    return;
  }

  @Get('/:idx')
  public async getPost(@Param('idx') idx: number, @Res() response: Response) {
    if (!Number.isInteger(idx)) {
      throw new HttpError(400, '검증 오류입니다.');
    }
      
    const post: PostBoard = await this.postService.getPost(idx);
    handleSuccess(response, 200, '글을 조회하였습니다.', { post });
    return;
  }

  @Post('/')
  public async createPost(@Body() request: PostDto, @Res() response: Response) {
    await this.postService.createPost(request);
    handleSuccess(response, 200, '글을 작성하였습니다.');
    return;
  }

  @Put('/:idx')
  public async modifyPost(@Param('idx') idx: number, @Body() request: PostDto, @Res() response: Response) {
    await this.postService.modifyPost(idx, request);
    handleSuccess(response, 200, '글을 수정하였습니다.');
    return;
  }

  @Delete('/:idx')
  public async deletePost(@Param('idx') idx: number, @Res() response: Response) {
    if (!Number.isInteger(idx)) {
      throw new HttpError(400, '검증 오류입니다.');
    }

    await this.postService.deletePost(idx);
    handleSuccess(response, 200, '글을 삭제하였습니다.');
    return;
  }
}