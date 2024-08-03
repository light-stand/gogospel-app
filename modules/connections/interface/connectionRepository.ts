import { Repository } from "@/interface/repository";
import { Connection } from "../domain/Connection";
import { supabase } from "@/interface/supabase";

export const connectionRepository = new Repository<Connection>("connection", supabase);
