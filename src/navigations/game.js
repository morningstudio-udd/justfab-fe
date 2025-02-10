import iconJackpot from "@images/game/icon-jackpot.png";
import iconTreasure from "@images/game/icon-treasure.png";
import iconBag from "@images/game/icon-bag.png";
import iconDaily from "@images/game/icon-daily.png";
import iconRef from "@images/game/icon-ref.png";

export const gameNav = [
  {
    to: "/game/connect-wallet",
    icon: iconTreasure,
    class: "tw-aspect-[232/170] tw-w-[19%]",
    imgClass: "!tw-max-w-[50%]",
    isLink: true,
    isLocked: true,
  },
  {
    to: "/game/inventory",
    icon: iconBag,
    class: "tw-aspect-[209/170] tw-w-[19%]",
    imgClass: "!tw-max-w-[55%]",
    isLink: true,
  },
  {
    to: "/game/jackpot",
    icon: iconJackpot,
    class: "tw-aspect-[231/170] tw-grow",
    imgClass: "!tw-max-w-[90%]",
    isLink: true,
  },
  {
    to: "/game/daily",
    icon: iconDaily,
    class: "tw-aspect-[207/170] tw-w-[19%]",
    imgClass: "!tw-max-w-[40%]",
    isLink: true,
  },
  {
    to: "",
    icon: iconRef,
    class: "tw-aspect-[202/170] tw-w-[19%]",
    imgClass: "!tw-max-w-[50%]",
    isLink: false,
    submenu: [
      {
        to: "/game/referral/settings",
        title: "Setting",
        isLocked: true,
      },
      {
        to: "/game/referral",
        title: "Referral",
      },
      {
        to: "/game/connect-wallet",
        title: "Futurepass",
      },
    ],
  },
];
