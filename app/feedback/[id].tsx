import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

import { ButtonBar, Container, Text } from "@/components";
import { useListFeedback } from "@/feedback/application/useListFeedback";
import { FeedbackList } from "@/feedback/components/FeedbackList";
import { ButtonBarOption } from "@/components/ui/actions/ButtonBar/ButtonBar";
import { ListFeedbackModes } from "@/feedback/domain/Feedback";

export default function Feedback() {
  const { t } = useTranslation();
  const id = useLocalSearchParams().id as string;

  const {
    query: { data, isFetching },
    mode,
    setMode,
  } = useListFeedback(id);

  const modeOptions: ButtonBarOption<ListFeedbackModes>[] = [
    { label: t("feedback.modes.received"), value: "received", icon: "account" },
    { label: t("feedback.modes.given"), value: "given", icon: "hand-extended" },
  ];

  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4">{t("feedback.titles.list")}</Text>
      <ButtonBar options={modeOptions} selected={mode} onPress={setMode} />
      <FeedbackList data={data || []} mode={mode} isFetching={isFetching} />
    </Container>
  );
}
