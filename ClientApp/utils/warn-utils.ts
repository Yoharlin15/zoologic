export const missing = (title: string, message: string) => {
  throw new Error(`[${title}]: ${message}`);
};

export const warn = (title: string, message: string) => {
  console.warn(`[${title}]: ${message}`);
};
