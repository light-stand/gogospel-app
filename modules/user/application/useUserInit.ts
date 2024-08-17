import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { ministryRepository } from "@/ministry/interface/ministryRepository";
import { missionaryRepository } from "@/missionary/interface/missionaryRepository";
import { User } from "../domain/User";
import { UserType } from "@/profiling/domain/Profiling";
import { useUserStore } from "../store/useUserStore";

export const useUserInit = () => {
  const router = useRouter();
  const { session } = useAuthStore();
  const { setUser, user } = useUserStore();

  const fetchUserProfiles = async () => {
    if (session?.user.id && session.user.id !== user?.id) {
      const [[missionary], [ministry]] = await Promise.all([
        missionaryRepository.get(["user_id", "eq", session.user.id]),
        ministryRepository.get(["user_id", "eq", session.user.id]),
      ]);

      if (!missionary && !ministry) {
        router.push("/onboarding/profiling/type");
        return;
      }

      const user: User = {
        id: session.user.id,
        email: session.user.email,
        type: missionary ? UserType.Missionary : UserType.Ministry,
        ministry,
        missionary,
      };

      setUser(user);
    }
  };

  useEffect(() => {
    if (session) fetchUserProfiles();
  }, [session]);
};
