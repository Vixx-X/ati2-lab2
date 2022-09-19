export const map2task = (obj: any) => {
  if (!obj.importance) return obj;
  const importance = obj.importance.toUpperCase();
  return { ...obj, importance };
};
