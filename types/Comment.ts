import { MongoDoc } from "./MongoDoc";
import { User } from "./User";

export interface Comment extends MongoDoc {
  //  extends MongoDoc
  user: User;
  content: string;
  _id: string;
  likes: string[];
}
