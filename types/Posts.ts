import { MongoDoc } from "./MongoDoc";
import { Vendor } from "./Vendor";

export interface Post extends MongoDoc {
  owner: Vendor;
  media: string[];
  mediaType: string;
  caption: string;
  tagged: {
    name: string;
    image: string;
  }[];
  project?: string;
}
