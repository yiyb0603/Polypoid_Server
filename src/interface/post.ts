import { PostBoard } from "entity/post";
import { IPostTypes } from "types/post";

export default interface IPostRepository {
  getPosts(): Promise<PostBoard[]>;
  getPost(idx: number): Promise<PostBoard>;
  createPost(request: IPostTypes): Promise<void>;
  modifyPost(idx: number, request: IPostTypes): Promise<void>;
  deletePost(idx: number): Promise<void>;
}