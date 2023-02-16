import { MongoDoc } from "./MongoDoc";
import { User } from "./User";

export interface Notification {
  _id?: string;
  author?: User | string;
  receiver: User | string;
  content: string;
  type: "error" | "warning" | "info" | "success";
  createdAt?: Date;
  updatedAt?: Date;
}
