import { MongoDoc } from "./MongoDoc";

export interface CommentLike extends MongoDoc {
  user: string;
  comment: string;
}
