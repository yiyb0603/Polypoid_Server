import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { PostBoard } from "entity/post";
import { PostService } from "service/PostService";
import { disposeError } from 'lib/DisposeError';
import { handleSuccess } from 'lib/Response/handleSuccess';
import { IPostTypes } from 'types/post';
import { validateCreatePost } from 'validation/Post';
import { handleFailed } from 'lib/Response/handleFailed';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  public async getPosts(@Req() request: Request, @Res() response: Response) {
    try {
      const posts: PostBoard[] = await this.postService.getPosts();
      handleSuccess(response, 200, '글 목록을 조회하였습니다.', { posts });
      return;

    } catch (error) {
      disposeError(error, response);
    }
  }

  @Get('/:idx')
  public async getPost(@Param('idx') idx: number, @Res() response: Response) {
    try {
      const post: PostBoard = await this.postService.getPost(idx);
      handleSuccess(response, 200, '글을 조회하였습니다.', { post });
      return;
    } catch (error) {
      disposeError(error, response);
    }
  }

  @Post('/')
  public async createPost(@Body() request: IPostTypes, @Res() response: Response) {
    try {
      if (!validateCreatePost(request, response)) {
        return;
      }

      await this.postService.createPost(request);
      handleSuccess(response, 200, '글을 작성하였습니다.');
      return;
    } catch (error) {
      console.log(error);
      disposeError(error, response);
    }
  }

  @Put('/:idx')
  public async modifyPost(@Req() request: Request, @Res() response: Response) {
    try {
      const postIdx: number = Number(request.params.idx);

      if (!Number.isInteger(postIdx)) {
        handleFailed(response, 400, '검증 오류입니다.');
        return;
      }

      if (!validateCreatePost(request, response)) {
        return;
      }

      await this.postService.modifyPost(postIdx, request.body);
      handleSuccess(response, 200, '글을 수정하였습니다.');
      return;
    } catch (error) {
      disposeError(error, response);
    }
  }

  @Delete('/:idx')
  public async deletePost(@Param('idx') idx: number, @Res() response: Response) {
    try {
      await this.postService.deletePost(idx);
      handleSuccess(response, 200, '글을 삭제하였습니다.');
      return;
    } catch (error) {
      disposeError(error, response);
    }
  }
}