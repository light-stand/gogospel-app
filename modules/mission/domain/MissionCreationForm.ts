import * as z from "zod";
import { t } from "i18next";
import { MissionType, missionTypes } from "@/mission/domain/MissionType";

export const missionCreationFlow = [
  "index",
  "details",
  "duration",
  "category",
  "location",
] as const;

export type MissionCreationScreen = (typeof missionCreationFlow)[number];

export const missionCreationSchema = z.object({
  // title: z.string().min(3, t("missionCreation.fields.firstName.error")).nullable(),
  // description: z.string().min(60, t("missionCreation.fields.bio.error")).nullable(),
  duration: z.number().nullable(),
  durationUnit: z.number().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  picture: z.string().min(64, t("missionCreation.fields.image.error")),
  categories: z
    .array(
      z.enum(Object.keys(missionTypes) as [MissionType, ...MissionType[]], {
        message: t("profiling.fields.interests.error"),
      })
    )
    .min(4, t("profiling.fields.interests.error"))
    .max(10, t("profiling.fields.interests.error")),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
});

export type MissionCreationFields = z.infer<typeof missionCreationSchema>;
