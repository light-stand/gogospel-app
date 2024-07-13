import { Repository } from "@/interface/repository";
import { Missionary } from "../domain/Missionary";
import { supabase } from "@/interface/supabase";

export const missionaryRepository = new Repository<Missionary>("missionary", supabase);
