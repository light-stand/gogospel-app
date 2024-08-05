import { Repository, SupabaseFilter } from "@/interface/repository";
import { Connection } from "../domain/Connection";
import { supabase } from "@/interface/supabase";

class ConnectionRepository extends Repository<Connection> {
  constructor() {
    super("connection", supabase);
  }

  get = async (filters: SupabaseFilter | SupabaseFilter[]): Promise<Connection[]> => {
    const query = this.client
      .from<string, Connection>(this.tableName)
      .select(
        `*, missionary(images, first_name), ministry(images, name), mission(title), messages:message(text)`
      )
      .order("created_at", { foreignTable: "message", ascending: false })
      .limit(1, { foreignTable: "message" });

    if (Array.isArray(filters[0])) {
      filters.forEach((filter: SupabaseFilter) => query.filter(...filter));
    } else if (filters.length === 3) {
      query.filter(...(filters as SupabaseFilter));
    }

    const { data, error } = await query;

    if (error) throw error;

    return data as unknown as Connection[];
  };
}

export const connectionRepository = new ConnectionRepository();
