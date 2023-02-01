import { MongoDoc } from "./MongoDoc";
import { User } from "./User";
import { Vendor } from "./Vendor";

export interface Comment {
  //  extends MongoDoc
  user: User | Vendor;

  content: string;
  _id: string;
  likes: string[];
}
