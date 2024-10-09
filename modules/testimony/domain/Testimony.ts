import { UserProfile } from "@/user/domain/User";

export type Testimony = {
  id: number;
  user_id: string;
  target_user_id: string;
  mission_id?: number;
  title: string;
  description: string;
  rating?: number;
  user?: UserProfile;
  target_user?: UserProfile;
  created_at: Date;
};
