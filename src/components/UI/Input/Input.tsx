import { ComponentProps, forwardRef } from "react";
import { classNames as cl } from "@/utils";
import s from "./Input.module.scss";

type InputProps = Omit<ComponentProps<"input">, "children">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cl(s.input, className)}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
