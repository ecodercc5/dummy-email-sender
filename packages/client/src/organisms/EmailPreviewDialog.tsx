import React, { useState } from "react";
import { EmailPreview } from "../components/EmailPreview";
import { IEmail, ISheet } from "../core";
import { fill } from "../utils";

interface Props {
  email: IEmail;
  sheet: ISheet;
}

const fillEmail = (email: IEmail, row: Object): IEmail => {
  const to = fill(email.to, row);
  const subject = fill(email.subject, row);
  const body = fill(email.body, row);

  return {
    to,
    subject,
    body,
  };
};

export const EmailPreviewDialog: React.FC<Props> = ({ email, sheet }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const rows = sheet.rows;
  const numContacts = rows.length;

  const next = () =>
    setActiveIndex(
      activeIndex + 1 < numContacts ? activeIndex + 1 : activeIndex
    );

  const back = () =>
    setActiveIndex(activeIndex - 1 >= 0 ? activeIndex - 1 : activeIndex);

  const activeRow = rows[activeIndex];
  const activeEmail = fillEmail(email, activeRow);

  return (
    <EmailPreview
      email={activeEmail}
      currentIndex={activeIndex}
      numEmails={numContacts}
      onNext={next}
      onBack={back}
    />
  );
};
