import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

import { ButtonBar, Container, Text } from "@/components";
import { useListTestimonies } from "@/testimony/application/useListTestimonies";
import { TestimonyList } from "@/testimony/components/TestimonyList";
import { ButtonBarOption } from "@/components/ui/actions/ButtonBar/ButtonBar";
import { ListTestimonyModes } from "@/testimony/domain/Testimony";

export default function Testimonies() {
  const { t } = useTranslation();
  const id = useLocalSearchParams().id as string;

  const {
    query: { data: testimonies },
    mode,
    setMode,
  } = useListTestimonies(id);

  const modeOptions: ButtonBarOption<ListTestimonyModes>[] = [
    { label: t("testimony.modes.received"), value: "received", icon: "account" },
    { label: t("testimony.modes.given"), value: "given", icon: "hand-extended" },
  ];

  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-4">{t("testimony.titles.list")}</Text>
      <ButtonBar options={modeOptions} selected={mode} onPress={setMode} />
      <TestimonyList testimonies={testimonies || []} mode={mode} />
    </Container>
  );
}
