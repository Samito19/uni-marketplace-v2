export type ListingDto = {
  author_id: string;
  category: string;
  condition: string;
  created_at?: string;
  description: string;
  id: string | undefined;
  images: string[];
  price: number;
  title: string;
  views?: number;
};
