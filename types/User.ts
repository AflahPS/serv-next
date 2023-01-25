export interface User {
  name: string;
  email: string;
  password: string;
  image?: string;
  location?: { type: string; coordinates: [number] };
  place: string;
  phone?: string;
  followers?: [string | {}];
  requests?: [string | {}];
  createdAt: Date;
  updatedAt: Date;
  _id: string | {};
}
