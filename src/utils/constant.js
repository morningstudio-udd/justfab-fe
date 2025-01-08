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

export const ERROR_MESSAGE = {};
