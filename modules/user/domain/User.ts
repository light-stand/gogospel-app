export type User = {
  id?: string;
  email?: string;
  profile?: UserProfile;
};

export type UserProfile = {
  id: number;
  user_id: string;
  name: string;
  description: string;
  lat?: number;
  lng?: number;
  is_verified: boolean;
  type: string;
  images: string[];
  created_at: string;
  updated_at: string;
};
