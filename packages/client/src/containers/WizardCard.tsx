import classNames from "classnames";
import React from "react";
import { Wizard } from "../components/Wizard";
import { Step, useAppStore } from "../hooks/use-app-store";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const TYPE_TO_ACTIVE_INDEX = {
  [Step.ImportSpreadSheet]: 0,
  [Step.PreviewSpreadSheet]: 1,
  [Step.WriteEmail]: 2,
  [Step.Confirmation]: 3,
  [Step.Success]: 3,
};

export const WizardCard: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  ...props
}) => {
  const type = useAppStore((state) => state.type);
  const activeIndex = TYPE_TO_ACTIVE_INDEX[type];

  return (
    <div className={classNames("flex flex-col gap-7", className)} {...props}>
      <Wizard
        className="w-full"
        activeIndex={activeIndex}
        numSteps={4}
        stepLabels={[
          "Import Contacts",
          "Preview Spreadsheet",
          "Write Email",
          "Confirm",
        ]}
      />

      {children}
    </div>
  );
};
