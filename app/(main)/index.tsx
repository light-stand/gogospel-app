import { MissionMap } from "@/mission/components/MissionMap";
import { useExploreMissions } from "@/mission/application/useExploreMissions";
import { MissionSwiper } from "@/mission/components/MissionSwiper";

export default function Explore() {
  const { focused, missions, setFocused } = useExploreMissions();

  return (
    <>
      <MissionMap missions={missions} focused={focused} setFocused={setFocused} />
      {missions && (
        <MissionSwiper
          className="absolute bottom-0"
          missions={missions}
          focusedEvent={focused}
          onPlanSelected={setFocused}
        />
      )}
    </>
  );
}
