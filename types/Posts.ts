export interface Post {
  _id: string;
  owner: {
    name: string;
    image: string;
  };
  media: string[];
  mediaType: string;
  caption: string;
  tagged: {
    name: string;
    image: string;
  }[];
}
