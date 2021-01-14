import { Request, Response } from 'express';
import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Put, Req, Res } from "@nestjs/common";
import { PostBoard } from "entity/post";
import { PostService } from "service/PostService";
import { handleSuccess } from 'lib/Response/handleSuccess';
import { PostDto } from 'entity/dto/Post.dto';
import HttpError from 'exception/HttpError';
import { decodeToken } from 'lib/Token';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  public async getPosts(@Headers() header, @Res() response: Response) {
    const token: any = decodeToken(String(header['polypoid-token']));

    const posts: PostBoard[] = await this.postService.getPosts(token.id);
    handleSuccess(response, 200, '글 목록을 조회하였습니다.', { posts });
    return;
  }

  @Get('/:idx')
  public async getPost(@Headers() header, @Param('idx') idx: number, @Res() response: Response) {
    if (!Number.isInteger(idx)) {
      throw new HttpError(400, '검증 오류입니다.');
    }
      
    const token: any = decodeToken(String(header['polypoid-token']));
    const post: PostBoard = await this.postService.getPost(idx, token.id);
    handleSuccess(response, 200, '글을 조회하였습니다.', { post });
    return;
  }

  @Post('/')
  public async createPost(@Headers() header, @Body() request: PostDto, @Res() response: Response) {
    const token: any = decodeToken(String(header['polypoid-token']));
    await this.postService.createPost(request, token);
    handleSuccess(response, 200, '글을 작성하였습니다.');
    return;
  }

  @Put('/:idx')
  public async modifyPost(@Headers() header, @Param('idx') idx: number, @Body() request: PostDto, @Res() response: Response) {
    const token: any = decodeToken(String(header['polypoid-token']));
    await this.postService.modifyPost(idx, request, token);
    handleSuccess(response, 200, '글을 수정하였습니다.');
    return;
  }

  @Delete('/:idx')
  public async deletePost(@Headers() header, @Param('idx') idx: number, @Res() response: Response) {
    if (!Number.isInteger(idx)) {
      throw new HttpError(400, '검증 오류입니다.');
    }

    const token: any = decodeToken(String(header['polypoid-token']));
    await this.postService.deletePost(idx, token.id);
    handleSuccess(response, 200, '글을 삭제하였습니다.');
    return;
  }
}