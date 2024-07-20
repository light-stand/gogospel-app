import { Ministry } from "@/ministry/domain/Ministry";
import { MissionType } from "./MissionType";

export type Mission = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  latitude: number;
  longitude: number;
  type: MissionType;
  ministry: Ministry;
  categories: string[];
  duration: number;
};

export type MissionViewInput = {
  min_lat: number;
  min_long: number;
  max_lat: number;
  max_long: number;
};
