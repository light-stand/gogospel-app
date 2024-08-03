import { Ministry } from "@/ministry/domain/Ministry";
import { Mission } from "@/mission/domain/Mission";
import { Missionary } from "@/missionary/domain/Missionary";

export type Connection = {
  id: number;
  mission_id: number;
  missionary_id: number;
  ministry_id: number;
  mission?: Mission;
  missionary?: Missionary;
  ministry?: Ministry;
  status?: ConnectionStatus;
};

export enum ConnectionStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}
