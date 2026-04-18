export const extractFilePath = (value: any): string | null => {
  if (!value) return null;

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value[0]?.response ?? null;
  }

  return value?.file?.response ?? value?.response ?? null;
};
