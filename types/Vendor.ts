import { Service } from "./Service";
import { User } from "./User";

export interface Vendor extends User {
  service: Service;
  about: string;
  experience?: number;
  employees?: [string | {}];
  jobs?: [string | {}];
  projects?: [string | {}];
  workingDays?: string;
  workRadius?: string;
}
