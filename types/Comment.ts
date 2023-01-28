import { MongoDoc } from "./MongoDoc";
import { User } from "./User";
import { Vendor } from "./Vendor";

export interface Comment {
  //  extends MongoDoc
  user:
    | User
    | Vendor
    | {
        name: string;
        _id: string;
        image: string;
      };
  content: string;
  _id: string;
  likes: number | string;
}
