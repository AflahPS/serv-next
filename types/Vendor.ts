import { MongoDoc } from "./MongoDoc";
import { Project } from "./Project";
import { Service } from "./Service";
import { User } from "./User";

export interface Vendor extends MongoDoc {
  service: Service;
  about: string;
  experience?: number;
  employees?: [
    {
      emp: User;
      joined: Date;
      projects: Project[];
    }
  ];
  jobs?: [string | {}];
  projects?: [string | {}];
  workingDays?: string;
  workRadius?: string;
  user: User;
}
