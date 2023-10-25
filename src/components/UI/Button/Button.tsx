import { ComponentProps, forwardRef } from "react";
import { classNames as cl } from "@/utils";
import { Circle } from "../Icons/Circle";
import s from "./Button.module.scss";

type ButtonProps = ComponentProps<"button"> & {
  isLoading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cl(s.button, className)}
        {...props}
      >
        {isLoading ? <Circle className={s.loader} /> : children}
      </button>
    );
  },
);

Button.displayName = "Button";
