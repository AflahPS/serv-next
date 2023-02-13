import { Project } from "./Project";
import { User } from "./User";

export interface Employee {
  emp: User;
  joined: Date;
  projects: Project[];
}
