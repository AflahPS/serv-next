import { MongoDoc } from "./MongoDoc";

export interface Like extends MongoDoc {
  user: string;
  post: string;
}
