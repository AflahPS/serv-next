import { MongoDoc } from "./MongoDoc";

export interface ChatMessage extends MongoDoc {
  author: string;
  chat: string;
  text: string;
}
