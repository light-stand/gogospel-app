export type Message = {
  id: number;
  text: string;
  user_id: string;
  created_at: string;
  connection_id: number;
  sent?: boolean; // Local only
  pending?: boolean; // Local only
};
