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

export const truncateString = (str, maxLength = 9, suffix = "...") => {
  if (typeof str !== "string") return "";
  return str.length > maxLength ? `${str.slice(0, maxLength)}${suffix}` : str;
};

export function animateCounter(start, end, duration, callback) {
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(
      start + (end - start) * easeOutCubic(progress)
    );

    callback(currentValue);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
export const base64UrlDecode = (str) => {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (str.length % 4)) % 4);
  const base64 = str + padding;
  return atob(base64);
};

export const parseJwt = (token) => {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload) {
    throw new Error("Invalid JWT token");
  }

  const decodedHeader = JSON.parse(base64UrlDecode(header));
  const decodedPayload = JSON.parse(base64UrlDecode(payload));

  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature,
  };
};
