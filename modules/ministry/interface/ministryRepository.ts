import { Repository } from "@/interface/repository";
import { Ministry } from "../domain/Ministry";
import { supabase } from "@/interface/supabase";

export const ministryRepository = new Repository<Ministry>("ministry", supabase);
