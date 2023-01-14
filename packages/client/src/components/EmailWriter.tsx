import React from "react";
import { IEmail } from "../core";
import { EmailInput } from "./EmailInput";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  email: IEmail;
  onEmailChange: (email: IEmail) => any;
}

export const EmailWriter: React.FC<Props> = ({
  email,
  onEmailChange,
  className,
  ...props
}) => {
  const { to, subject, body } = email;

  return (
    <div className={`flex flex-col ${className}`} {...props}>
      <EmailInput
        withDivider
        dataLabel="to"
        label="To"
        value={to}
        onValueChange={(value) => onEmailChange({ ...email, to: value })}
      />
      <EmailInput
        withDivider
        dataLabel="subject"
        label="Subject"
        value={subject}
        onValueChange={(value) => onEmailChange({ ...email, subject: value })}
      />
      <EmailInput
        dataLabel="body"
        className="h-full"
        variant="textarea"
        label="Compose Email"
        value={body}
        onValueChange={(value) => onEmailChange({ ...email, body: value })}
      />
    </div>
  );
};
