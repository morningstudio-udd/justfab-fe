const devVerticalNav = [
  {
    title: "Items",
    isLink: true,
    to: "/admin/items",
    icon: "material-symbols-light:home-outline",
  },
];

const prodVerticalNav = [
  {
    title: "Items",
    isLink: true,
    to: "/admin/items",
    icon: "material-symbols-light:home-outline",
  },
];

export const verticalNav =
  import.meta.env.MODE === "development" ? devVerticalNav : prodVerticalNav;

const devDefaultVerticalNav = [];

const prodDefaultVerticalNav = [];

export const defaultVerticalNav =
  import.meta.env.MODE === "development"
    ? devDefaultVerticalNav
    : prodDefaultVerticalNav;
