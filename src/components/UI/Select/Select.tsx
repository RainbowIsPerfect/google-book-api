import { ComponentProps, forwardRef } from "react";
import { classNames as cl } from "@/utils";
import s from "./select.module.scss";

export type OptionProps = {
  value: string;
  label: string;
};

export type SelectProps = Omit<ComponentProps<"select">, "children"> & {
  options: OptionProps[];
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, className, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cl(s.select, className)}
        {...props}
      >
        {options.map(({ label, value }) => {
          return (
            <option
              key={value}
              value={value}
            >
              {label}
            </option>
          );
        })}
      </select>
    );
  },
);

Select.displayName = "Select";
