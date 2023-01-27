import { MongoDoc } from "./MongoDoc";
import { Post } from "./Posts";

export interface Service extends MongoDoc {
  title: string;
  image: string;
  caption: string;
}
