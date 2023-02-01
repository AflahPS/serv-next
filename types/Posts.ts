import { MongoDoc } from "./MongoDoc";
import { User } from "./User";

export interface Post extends MongoDoc {
  owner: User;
  media: string[];
  mediaType: string;
  caption: string;
  tagged: {
    name: string;
    image: string;
  }[];
  project?: string;
}
