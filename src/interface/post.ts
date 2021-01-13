import { PostBoard } from "entity/post";
import { IPostTypes } from "types/post";

export default interface IPostRepository {
  getPosts(id: string): Promise<PostBoard[]>;
  getPost(idx: number, id: string): Promise<PostBoard>;
  createPost(request: IPostTypes, token: any): Promise<void>;
  modifyPost(idx: number, request: IPostTypes, token: any): Promise<void>;
  deletePost(idx: number, id: string): Promise<void>;
}