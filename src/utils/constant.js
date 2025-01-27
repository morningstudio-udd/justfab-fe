export const ROLES = {
  GUEST: "GUEST",
  USER: "USER",
  ADMIN: "ADMIN",
};

export const USER_ABILITY_RULES = {
  [ROLES.GUEST]: [],
  [ROLES.USER]: [
    {
      action: "read",
      subject: "User",
      // fields: ["id", "name", "email"],
    },
    {
      action: "update",
      subject: "User",
      // fields: ["name", "email"],
    },
  ],
  [ROLES.ADMIN]: [
    {
      action: "manage",
      subject: "all",
    },
  ],
};

export const ITEM_CATEGORIES = {
  WEAPON: "WEAPON",
  ARMOR: "ARMOR",
  PET: "PET",
  ACCESSORY: "ACCESSORY",
};

export const ITEM_RARITIES = {
  COMMON: "COMMON",
  RARE: "RARE",
  ULTRA_RARE: "ULTRA_RARE",
  EPIC: "EPIC",
  LEGENDARY: "LEGENDARY",
  MYTHIC: "MYTHIC",
};

export const REWARD_TYPES = {
  GOLD: "GOLD",
  TOKEN: "TOKEN",
  FOOD: "FOOD",
  ITEM: "ITEM",
  JACKPOT: "JACKPOT",
  SPIN: "SPIN",
  POOL_PERCENTAGE: "POOL_PERCENTAGE",
};

export const ERROR_MESSAGE = {};
