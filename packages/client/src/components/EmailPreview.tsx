import React from "react";
import { IEmail } from "../core";
import { SquareIconButton } from "./SquareIconButton";
import {
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { EmailWriter } from "./EmailWriter";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  email: IEmail;
  currentIndex: number;
  numEmails: number;
  onNext?: () => any;
  onBack?: () => any;
}

export const EmailPreview: React.FC<Props> = ({
  email,
  currentIndex,
  numEmails,
  onNext,
  onBack,
}) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <Dialog.Close>
          <SquareIconButton icon={XMarkIcon} />
        </Dialog.Close>

        <div className="flex">
          <span className="text-blue-gray mr-4">
            {currentIndex + 1} of {numEmails}
          </span>
          <SquareIconButton
            className="mr-2"
            icon={ChevronUpIcon}
            onClick={onBack}
          />
          <SquareIconButton icon={ChevronDownIcon} onClick={onNext} />
        </div>
      </div>

      <EmailWriter writable={false} email={email} />
    </>
  );
};
