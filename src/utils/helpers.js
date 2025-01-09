// 👉 IsEmpty
export const isEmpty = (value) => {
  if (value === null || value === undefined || value === "") return true;

  return Array.isArray(value) && value.length === 0;
};

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

// 👉 IsEmptyArray
export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0;
};

// 👉 IsObject
export const isObject = (obj) => {
  return obj !== null && typeof obj === "object" && !Array.isArray(obj);
};

// 👉 IsToday
export const isToday = (date) => {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// 👉 IsHtml
export const isHtml = (str) => {
  if (typeof str !== "string") return false;
  const pattern = /<[^>]+>/;
  return pattern.test(str);
};

/**
 * Generate a random string.
 * @see https://dev.to/roblevintennis/comment/10148
 */
export const randomString = () => {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );
};

export const playSound = (audioUrl) => {
  const audio = new Audio(audioUrl);
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
};

export const getApiPath = (path, params) => {
  return path.replace(/:([a-zA-Z]+)/g, (_, key) => params[key]);
};
