import { MongoDoc } from "./MongoDoc";

export interface User extends MongoDoc {
  name: string;
  email: string;
  password: string;
  image?: string;
  location?: { type: string; coordinates: [number] };
  place: string;
  phone?: string;
  followers?: [string | {}];
  requests?: [string | {}];
}
