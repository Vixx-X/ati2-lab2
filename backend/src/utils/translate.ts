export const translate = (_: Function, obj: any): any => {
  if (Array.isArray(obj)) return obj.map((el: any) => translate(_, el));
  if (typeof obj === "object")
    return Object.fromEntries(
      Object.entries(obj).map(([key, el]) => [key, translate(_, el)])
    );
  if (typeof obj === "string") return _(obj);
  return obj;
};

export default translate;
