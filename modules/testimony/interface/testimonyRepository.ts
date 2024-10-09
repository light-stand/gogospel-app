import { Repository } from "@/interface/repository";
import { Testimony } from "../domain/Testimony";
import { supabase } from "@/interface/supabase";

export const testimonyRepository = new Repository<Testimony>("testimony", supabase);
