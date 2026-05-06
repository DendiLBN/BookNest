export type TBookBodyParams = {
  page: number;
  perPage: number;
  searchString: string;
  category: string[];
};

export type TBookBodyResponse = {
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
