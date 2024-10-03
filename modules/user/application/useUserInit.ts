import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { User } from "../domain/User";
import { useUserStore } from "../store/useUserStore";
import { userProfileRepository } from "../interface/userProfileRepository";

export const useUserInit = () => {
  const router = useRouter();
  const { session } = useAuthStore();
  const { setUser, user } = useUserStore();

  const fetchUserProfiles = async () => {
    if (session?.user.id && session.user.id !== user?.id) {
      const [userProfile] = await userProfileRepository.get(["user_id", "eq", session.user.id]);

      if (session?.user.id && !userProfile) {
        router.replace("/onboarding/profiling/name");
        return;
      }

      const user: User = {
        id: session.user.id,
        email: session.user.email,
        profile: userProfile,
      };

      setUser(user);
    }
  };

  useEffect(() => {
    if (session) fetchUserProfiles();
  }, [session]);
};
