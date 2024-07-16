import { Repository } from "@/interface/repository";
import { Mission, MissionViewInput } from "../domain/Mission";
import { supabase } from "@/interface/supabase";

class MissionRepository extends Repository<Mission> {
  constructor() {
    super("mission_view", supabase);
  }

  // for when we have a millions missions :)
  getMissionsOnView = async (view: MissionViewInput): Promise<Mission[]> => {
    const { data, error } = await this.client.rpc("missions_in_view", view);
    console.log(data);
    if (error) {
      console.error("Error fetching data:", error);
      throw error;
    }

    return data as Mission[];
  };
}

export const missionRepository = new MissionRepository();
