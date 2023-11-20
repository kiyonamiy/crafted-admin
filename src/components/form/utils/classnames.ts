type ClassValue =
  | string
  | number
  | Record<string, boolean | undefined>
  | undefined
  | null
  | false;

export default function classNames(...args: ClassValue[]): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === "string" || typeof arg === "number") {
      classes.push(String(arg));
    } else if (typeof arg === "object" && arg) {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  });

  return classes.join(" ");
}
