export type TBookBody = {
  _id: string;
  category: string[];
  key: string;
  title: string;
  rate: number;
  author: string;
  tags: string[];
  avatar?: string;
  coverImageUrl?: string;
};
