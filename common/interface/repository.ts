import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

export class Repository<T> {
  public tableName: string;
  public client: SupabaseClient;

  constructor(tableName: string, client: SupabaseClient) {
    this.tableName = tableName;
    this.client = client;
  }

  async get(query: Record<string, unknown>, select = "*"): Promise<T[]> {
    const { data, error } = await this.client
      .from<string, T>(this.tableName)
      .select(select)
      .match(query);

    if (error) {
      console.error("Error fetching data:", error);
      throw error;
    }

    return data as T[];
  }

  async getById(id: string): Promise<T> {
    const { data, error } = await this.client
      .from<string, T>(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching data by id:", error);
      throw error;
    }

    return data as T;
  }

  async create(newData: Omit<T, "id" | "created_at" | "updated_at">): Promise<T> {
    const { data, error }: PostgrestSingleResponse<T> = await this.client
      .from<string, T>(this.tableName)
      .insert(newData as any)
      .single();

    console.log(data, error);
    if (error) {
      console.error("Error creating data:", error);
      throw error;
    }

    return data as T;
  }

  async update(id: string, updatedData: Partial<T>): Promise<T> {
    const { data, error }: PostgrestSingleResponse<T> = await this.client
      .from<string, T>(this.tableName)
      .update(updatedData as any)
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error updating data:", error);
      throw error;
    }

    return data as T;
  }

  async delete(id: string): Promise<T> {
    const { data, error }: PostgrestSingleResponse<T> = await this.client
      .from<string, T>(this.tableName)
      .delete()
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error deleting data:", error);
      throw error;
    }

    return data as T;
  }
}
