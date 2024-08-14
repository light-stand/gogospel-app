import * as z from "zod";
import { t } from "i18next";
import { UserType } from "./Profiling";
import { MissionType, missionTypes } from "@/mission/domain/MissionType";
import { ministryTypes, MinistryType } from "@/ministry/domain/MinistryType";

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
      .min(4, t("profiling.fields.interests.error"))
      .max(10, t("profiling.fields.interests.error"))
      .optional(),
    ministryType: z
      .array(
        z.enum(Object.keys(ministryTypes) as [MinistryType, ...MinistryType[]], {
          message: t("profiling.fields.ministryType.error"),
        })
      )
      .min(1, t("profiling.fields.ministryType.error"))
      .max(1, t("profiling.fields.ministryType.error"))
      .optional(),
  })
  .refine(({ type, lastName }) => (type === UserType.Missionary ? !!lastName : true), {
    message: t("profiling.fields.lastName.error"),
    path: ["lastName"],
  })
  .refine(({ type, interests }) => (type === UserType.Missionary ? !!interests : true), {
    message: t("profiling.fields.interests.error"),
    path: ["interests"],
  })
  .refine(({ type, ministryType }) => (type === UserType.Ministry ? !!ministryType : true), {
    message: t("profiling.fields.ministryType.error"),
    path: ["ministryType"],
  });

export type ProfilingFields = z.infer<typeof profilingSchema>;
