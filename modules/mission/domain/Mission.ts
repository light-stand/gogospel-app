import { Ministry } from "@/ministry/domain/Ministry";
import { MissionType } from "./MissionType";
import { Favorite } from "./Favorite";

export type Mission = {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  end_date?: string;
  images?: string[];
  location?: string;
  ministry?: Ministry;
  ministry_id?: number;
  categories: MissionType[];
  duration?: number;
  longitude?: number;
  latitude?: number;
  location_name?: string;
  active?: boolean;
  approved?: boolean;
  favorite?: Favorite[];
};

export type MissionViewInput = {
  min_lat: number;
  min_long: number;
  max_lat: number;
  max_long: number;
};
