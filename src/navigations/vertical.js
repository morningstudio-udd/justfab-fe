const devVerticalNav = [
  {
    title: "Items",
    isLink: true,
    to: "/dashboard/items",
    icon: "material-symbols-light:home-outline",
  },
  {
    title: "Fusion",
    isLink: true,
    to: "/dashboard/fusion",
    icon: "material-symbols-light:home-outline",
  },
  {
    title: "Slot Machine",
    isLink: true,
    to: "/dashboard/slot-machine",
    icon: "material-symbols-light:home-outline",
  },
  {
    title: "Jackpot",
    isLink: true,
    to: "/dashboard/jackpot",
    icon: "material-symbols-light:home-outline",
  },
];

const prodVerticalNav = [...devVerticalNav];

export const verticalNav =
  import.meta.env.MODE === "development" ? devVerticalNav : prodVerticalNav;

const devDefaultVerticalNav = [];

const prodDefaultVerticalNav = [];

export const defaultVerticalNav =
  import.meta.env.MODE === "development"
    ? devDefaultVerticalNav
    : prodDefaultVerticalNav;
