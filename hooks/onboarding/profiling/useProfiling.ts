import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profilingFlow } from "@/constants/profiling";
import { UserType } from "@/constants/profiling";

const schema = z.object({
  type: z.nativeEnum(UserType),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  bio: z.string().min(60),
  image: z.string().min(64),
});

type ProfilingFields = z.infer<typeof schema>;

export const useProfiling = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  return { form };
};
