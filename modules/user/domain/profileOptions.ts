import { ProfileOptions } from "../components/ProfileOptions";

export const profileOptions: ProfileOptions = [
  {
    label: "user.profile.options.missions",
    items: [
      {
        icon: "hand-heart",
        label: "user.profile.options.connectedVolunteers",
        href: "/settings",
      },
      {
        icon: "comment-check-outline",
        label: "user.profile.options.testimonies",
        href: "/settings",
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
      },
      {
        icon: "lock-check-outline",
        label: "user.profile.options.verificationCode",
        href: "/settings",
      },
      {
        icon: "logout",
        label: "user.profile.options.logout",
        action: "logout",
      },
    ],
  },
];

export const publicProfileOptions: ProfileOptions = [
  {
    items: [
      {
        icon: "handshake-outline",
        label: "user.profile.options.done",
        href: "/settings",
      },
      {
        icon: "handshake-outline",
        label: "user.profile.myMissions",
        href: "/settings",
      },
      ...profileOptions[0].items,
    ],
  },
];
