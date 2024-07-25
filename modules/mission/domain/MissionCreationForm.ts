import * as z from "zod";
import { t } from "i18next";
import { MissionType, missionTypes } from "@/mission/domain/MissionType";

export const missionCreationFlow = [
  "index",
  "details",
  "duration",
  "category",
  "location",
  "image",
] as const;

export const fieldsByScreen = {
  index: [],
  details: ["title", "description"],
  duration: ["startDate", "duration", "durationMultiplier"],
  category: ["categories"],
  location: ["location"],
  image: ["image"],
} as const;

export type MissionCreationScreen = (typeof missionCreationFlow)[number];

const langPrefix = "mission.creation.error";

export const missionCreationSchema = z.object({
  title: z.string().min(3, t(`${langPrefix}.title`)),
  description: z.string().min(60, t(`${langPrefix}.description`)),
  startDate: z
    .date({ message: t(`${langPrefix}.startDate`) })
    .min(new Date(), t(`${langPrefix}.startDateAfterToday`)),
  duration: z.number().min(1, t(`${langPrefix}.duration`)),
  durationMultiplier: z.number({ message: t(`${langPrefix}.durationMultiplier`) }),
  // endDate: z.date().nullable(),
  categories: z
    .array(
      z.enum(Object.keys(missionTypes) as [MissionType, ...MissionType[]], {
        message: t(`profiling.fields.interests.error`),
      })
    )
    .min(4, t(`${langPrefix}.categories`))
    .max(10, t(`${langPrefix}.categories`)),
  location: z.object(
    {
      latitude: z.number(),
      longitude: z.number(),
    },
    { message: t(`${langPrefix}.location`) }
  ),
  image: z.string().nullable(),
});

export type MissionCreationFields = z.infer<typeof missionCreationSchema>;
