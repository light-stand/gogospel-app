import { Stack, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

import { Button, Container, Input, Text } from "@/components";
import { missionRepository } from "@/mission/interface/missionRepository";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { useSendSubmission } from "@/connections/application/useSendSubmission";
import { zodResolver } from "@hookform/resolvers/zod";
import { submissionSchema, Submission } from "@/connections/domain/Submission";

export default function MissionRequest() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<Submission>({
    resolver: zodResolver(submissionSchema),
  });

  const { data: mission } = useQuery({
    queryKey: ["mission", id],
    queryFn: () => missionRepository.getById(id as string, "*, ministry(id, name, images)"),
  });

  const { sendSubmission } = useSendSubmission(mission);

  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4">
        {t("connections.submission.title", { name: mission?.title })}
      </Text>
      <Text className="font-bold text-neutral-500 mb-4">
        {t("connections.submission.text", { ministry: mission?.ministry?.name })}
      </Text>
      <Input type="textarea" control={control} name="message" />
      <Button label={t("action.send")} className="mt-auto" onPress={handleSubmit(sendSubmission)} />
    </Container>
  );
}
