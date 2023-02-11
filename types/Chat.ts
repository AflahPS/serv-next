import { MongoDoc } from "./MongoDoc";
import { User } from "./User";

export interface Chat extends MongoDoc {
  user1: User;
  user2: User;
  lastSession: Date;
}
