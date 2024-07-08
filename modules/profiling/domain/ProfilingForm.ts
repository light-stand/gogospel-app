import * as z from "zod";
import { UserType } from "./Profiling";

export const profilingSchema = z.object({
  type: z.nativeEnum(UserType),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  bio: z.string().min(60),
  image: z.string().min(64),
});

export type ProfilingFields = z.infer<typeof profilingSchema>;
