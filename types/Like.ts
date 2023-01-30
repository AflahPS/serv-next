import { MongoDoc } from "./MongoDoc";

export interface Like extends MongoDoc {
  user: {
    _id: string;
    name: string;
    image: string;
  };
  post: string;
}
