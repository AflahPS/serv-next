import { MongoDoc } from "./MongoDoc";

export interface Post extends MongoDoc {
  owner: {
    name: string;
    image: string;
  };
  media: string[];
  mediaType: string;
  caption: string;
  tagged: {
    name: string;
    image: string;
  }[];
}
