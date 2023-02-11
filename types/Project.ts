import { MongoDoc } from "./MongoDoc";
import { Service } from "./Service";
import { User } from "./User";
import { Vendor } from "./Vendor";

export interface Project extends MongoDoc {
  title: string;
  vendor: Vendor;
  service: Service;
  status: string;
  location?: { type: string; coordinates: [number] };
  place: string;
  client: User;
  startDate: string;
  endDate: string;
  caption?: string;
}
