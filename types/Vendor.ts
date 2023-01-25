export interface Vendor {
  _id?: string;
  name: string;
  email: string;
  password: string;
  service: string | {};
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
  createdAt?: Date;
  updatedAt?: Date;
}
