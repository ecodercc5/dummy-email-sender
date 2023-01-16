import React from "react";
import classNames from "classnames";
import { IconComponent } from "../types";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconComponent;
}

export const SquareIconButton: React.FC<Props> = ({
  icon: Icon,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        "square-icon-btn flex justify-center items-center",
        className
      )}
      {...props}
    >
      <Icon className="w-6 h-6 stroke-blue-gray" />
    </button>
  );
};
