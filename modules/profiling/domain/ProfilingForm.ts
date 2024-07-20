import * as z from "zod";
import { t } from "i18next";
import { UserType } from "./Profiling";
import { MissionType, missionTypes } from "@/mission/domain/MissionType";

export const profilingSchema = z
  .object({
    type: z.nativeEnum(UserType, { message: t("profiling.fields.types.error") }),
    firstName: z.string().min(3, t("profiling.fields.firstName.error")),
    lastName: z.string().min(3, t("profiling.fields.lastName.error")).optional(),
    bio: z.string().min(60, t("profiling.fields.bio.error")),
    picture: z.string().min(64, t("profiling.fields.image.error")),
    interests: z
      .array(
        z.enum(Object.keys(missionTypes) as [MissionType, ...MissionType[]], {
          message: t("profiling.fields.interests.error"),
        })
      )
      .min(3, t("profiling.fields.interests.error"))
      .optional(),
  })
  .refine(({ type, lastName }) => (type === UserType.Missionary ? !!lastName : true), {
    message: t("profiling.fields.lastName.error"),
    path: ["lastName"],
  })
  .refine(({ type, interests }) => (type === UserType.Missionary ? !!interests : true), {
    message: t("profiling.fields.interests.error"),
    path: ["interests"],
  });

export type ProfilingFields = z.infer<typeof profilingSchema>;
