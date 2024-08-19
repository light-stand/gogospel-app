import { Ministry } from "@/ministry/domain/Ministry";
import { MissionType } from "./MissionType";

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
  distance?: number;
  lat?: number;
  long?: number;
  location_name?: string;
  active?: boolean;
  approved?: boolean;
};

export type MissionViewInput = {
  min_lat: number;
  min_long: number;
  max_lat: number;
  max_long: number;
};
