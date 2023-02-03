import { MongoDoc } from "./MongoDoc";
import { User } from "./User";

export interface Appointment extends MongoDoc {
  user: User;
  vendor?: User;
  date: Date | string;
  status: string;
}
