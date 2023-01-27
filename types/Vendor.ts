import { MongoDoc } from "./MongoDoc";
import { Service } from "./Service";

export interface Vendor extends MongoDoc {
  name: string;
  email: string;
  password: string;
  service: Service | string;
  location?: { type: string; coordinates: [number] };
  place?: string;
  phone: string;
  about: string;
  image?: string;
  experience?: number;
  followers?: [string | {}];
  requests?: [string | {}];
  employees?: [string | {}];
  jobs?: [string | {}];
  projects?: [string | {}];
  workingDays?: string;
  workRadius?: string;
}
