import React from "react";
import { IEmail } from "../core";
import { EmailInput } from "./EmailInput";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  writable?: boolean;
  email: IEmail;
  onEmailChange?: (email: IEmail) => any;
}

export const EmailWriter: React.FC<Props> = ({
  writable = true,
  email,
  onEmailChange,
  className,
  ...props
}) => {
  const { to, subject, body } = email;

  const onEmailChange_ = (email: IEmail) =>
    onEmailChange && onEmailChange(email);

  const handleToChange = (to: string) => onEmailChange_({ ...email, to });

  const handleSubjectChange = (subject: string) =>
    onEmailChange_({ ...email, subject });

  const handleBodyChange = (body: string) => onEmailChange_({ ...email, body });

  return (
    <div className={`flex flex-col ${className}`} {...props}>
      <EmailInput
        writable={writable}
        withDivider
        dataLabel="to"
        label="To"
        value={to}
        onValueChange={handleToChange}
      />
      <EmailInput
        writable={writable}
        withDivider
        dataLabel="subject"
        label="Subject"
        value={subject}
        onValueChange={handleSubjectChange}
      />
      <EmailInput
        writable={writable}
        dataLabel="body"
        className="h-full"
        variant="textarea"
        label="Compose Email"
        value={body}
        onValueChange={handleBodyChange}
      />
    </div>
  );
};
