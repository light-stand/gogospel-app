import { MaterialIconType } from "@/components/ui/foundation/Icon/Icon";

export type MissionType =
  | "evangelism"
  | "service"
  | "teaching"
  | "worship"
  | "fellowship"
  | "other";

export const missionTypeIcon: Record<MissionType, MaterialIconType> = {
  evangelism: "bullhorn",
  service: "handshake",
  teaching: "book-open-variant",
  worship: "music",
  fellowship: "emoticon-wink",
  other: "dots-horizontal",
};
