export type Classes =
  | Record<string, boolean | undefined>
  | undefined
  | null
  | string;

export const classNames = (...classes: Classes[]) => {
  const computed = [];
  for (const cn of classes) {
    if (cn) {
      if (typeof cn === "string") {
        computed.push(cn);
      } else {
        for (const key in cn) {
          if (cn[key]) {
            computed.push(key);
          }
        }
      }
    }
  }

  return computed.join(" ");
};

export default classNames;
