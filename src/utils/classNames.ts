export type Classes =
  | Record<string, boolean | undefined | null>
  | undefined
  | null
  | string
  | number;

export const classNames = (...classes: Classes[]) => {
  const computed: string[] = [];
  classes.forEach((cn) => {
    if (cn) {
      if (typeof cn !== "object") {
        return computed.push(String(cn));
      }
      for (const key in cn) {
        if (cn[key]) {
          computed.push(key);
        }
      }
    }
  });

  return computed.join(" ");
};
