import { MaterialIconType } from "@/components/ui/foundation/Icon/Icon";
import { UserType } from "@/profiling/domain/Profiling";

type ProfileOptions = {
  label: string;
  items: {
    icon: MaterialIconType;
    label: string;
    href?: string;
    userType?: UserType;
    action?: "logout";
    disabled?: boolean;
  }[];
}[];

export const profileOptions: ProfileOptions = [
  {
    label: "user.profile.options.missions",
    items: [
      {
        icon: "heart-outline",
        label: "user.profile.favorites",
        href: "/settings",
        userType: UserType.Missionary,
        disabled: true,
      },
      {
        icon: "handshake-outline",
        label: "user.profile.options.done",
        href: "/settings",
        userType: UserType.Missionary,
        disabled: true,
      },
      {
        icon: "handshake-outline",
        label: "user.profile.myMissions",
        href: "/settings",
        userType: UserType.Ministry,
        disabled: true,
      },
      {
        icon: "hand-heart",
        label: "user.profile.options.connectedVolunteers",
        href: "/settings",
        userType: UserType.Ministry,
        disabled: true,
      },
      {
        icon: "comment-check-outline",
        label: "user.profile.options.testimonies",
        href: "/settings",
        disabled: true,
      },
    ],
  },
  {
    label: "user.profile.options.settings",
    items: [
      {
        icon: "bell",
        label: "user.profile.options.notification",
        href: "/settings",
        disabled: true,
      },
      {
        icon: "lock-check-outline",
        label: "user.profile.options.verificationCode",
        href: "/settings",
        userType: UserType.Ministry,
      },
      {
        icon: "logout",
        label: "user.profile.options.logout",
        action: "logout",
      },
    ],
  },
];
