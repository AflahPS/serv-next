import { MongoDoc } from "./MongoDoc";
import { Vendor } from "./Vendor";

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
  role: string;
  vendor?: Vendor;
}
