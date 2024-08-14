export type Ministry = {
  id: number;
  user_id: string;
  name: string;
  description: string;
  lat?: number;
  lng?: number;
  verified: boolean;
  images: string[];
  created_at: string;
  updated_at: string;
};
