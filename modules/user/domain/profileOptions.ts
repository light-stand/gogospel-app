import { UserType } from "@/profiling/domain/Profiling";
import { ProfileOptions } from "../components/ProfileOptions";

export const publicProfileOptions: ProfileOptions = [
  {
    items: [
      {
        icon: "handshake-outline",
        label: "user.profile.options.done",
        href: "/settings",
        // userType: UserType.Missionary,
        // disabled: true,
      },
      {
        icon: "handshake-outline",
        label: "user.profile.myMissions",
        href: "/settings",
        // userType: UserType.Ministry,
        // disabled: true,
      },
      {
        icon: "hand-heart",
        label: "user.profile.options.connectedVolunteers",
        href: "/settings",
        // userType: UserType.Ministry,
        // disabled: true,
      },
      {
        icon: "comment-check-outline",
        label: "user.profile.options.testimonies",
        href: "/settings",
        // disabled: true,
      },
    ],
  },
];

export const profileOptions: ProfileOptions = [
  {
    label: "user.profile.options.missions",
    items: [
      {
        icon: "heart-outline",
        label: "user.profile.favorites",
        href: "/mission/favorites",
        // userType: UserType.Missionary,
        // disabled: true,
      },
      ...publicProfileOptions[0].items,
    ],
  },
  {
    label: "user.profile.options.settings",
    items: [
      {
        icon: "bell",
        label: "user.profile.options.notification",
        href: "/settings",
        // disabled: true,
      },
      {
        icon: "lock-check-outline",
        label: "user.profile.options.verificationCode",
        href: "/settings",
        // userType: UserType.Ministry,
      },
      {
        icon: "logout",
        label: "user.profile.options.logout",
        action: "logout",
      },
    ],
  },
];
