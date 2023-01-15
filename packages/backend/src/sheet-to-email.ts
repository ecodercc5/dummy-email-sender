import { IEmail } from "./email";
import { IGoogleSheet } from "./apis/google-sheets";
import { TemplateFill } from "./template";

// toHeader: What column is the email field underneath
export const createSpreadSheetToEmails = (templateFill: TemplateFill) => {
  const spreadSheetToEmails = (
    sheet: IGoogleSheet,
    template: { to: string; subject: string; body: string }
  ): IEmail[] => {
    const { to, subject, body } = template;

    return sheet.rows.map((row) => {
      const toLine = templateFill(to, row);
      const subjectLine = templateFill(subject, row);
      const filledBody = templateFill(body, row);

      return {
        to: toLine,
        subject: subjectLine,
        body: filledBody,
      };
    });
  };

  return spreadSheetToEmails;
};
