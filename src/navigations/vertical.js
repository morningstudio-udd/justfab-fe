const devVerticalNav = [
  
];

const prodVerticalNav = [
  
];

export const verticalNav =
  import.meta.env.MODE === "development" ? devVerticalNav : prodVerticalNav;

const devDefaultVerticalNav = [
  
];

const prodDefaultVerticalNav = [
  
];

export const defaultVerticalNav =
  import.meta.env.MODE === "development"
    ? devDefaultVerticalNav
    : prodDefaultVerticalNav;
