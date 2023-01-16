import React from "react";
import classNames from "classnames";
import { body, heading } from "../styles";
import { IconComponent } from "../types";
import { IconCard } from "./IconCard";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  icon: IconComponent;
  header: string;
  text: any;
}

export const InstructionSection: React.FC<Props> = ({
  icon,
  header,
  text,
  className,
  ...props
}) => {
  return (
    <div className={classNames("flex flex-col gap-7", className)} {...props}>
      <IconCard icon={icon} />

      <div className="flex flex-col gap-2">
        <h1 className={heading.default}>{header}</h1>
        <p className={body.lg}>{text}</p>
      </div>
    </div>
  );
};
