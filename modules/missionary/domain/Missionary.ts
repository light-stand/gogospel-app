import { MissionType } from "@/mission/domain/MissionType";

export type Missionary = {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  bio: string;
  images: string[];
  interests: MissionType[];
  created_at: string;
  updated_at: string;
};
