import { Ministry } from "@/ministry/domain/Ministry";
import { Missionary } from "@/missionary/domain/Missionary";
import { UserType } from "@/profiling/domain/Profiling";

export type User = {
  id?: string;
  email?: string;
  type?: UserType;
  missionary?: Missionary;
  ministry?: Ministry;
};
