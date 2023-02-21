import { MongoDoc } from "./MongoDoc";
import { Post } from "./Posts";
import { Vendor } from "./Vendor";

export interface User extends MongoDoc {
  name: string;
  email: string;
  password: string;
  image?: string;
  location?: { type: string; coordinates: [number] };
  place: string;
  phone?: string;
  followers?: string[];
  following?: string[];
  role: string;
  vendor?: Vendor;
  isBanned?: boolean;
  savedPosts?: string[];
}
