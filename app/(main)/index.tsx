import { MissionMap } from "@/mission/components/MissionMap";
import { useExploreMissions } from "@/mission/application/useExploreMissions";

export default function Explore() {
  const { focused, missions, setFocused } = useExploreMissions();

  return (
    <>
      <MissionMap missions={missions} focused={focused} setFocused={setFocused} />
    </>
  );
}
