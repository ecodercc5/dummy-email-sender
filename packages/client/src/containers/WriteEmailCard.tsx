import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../components/Card";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "../components/Button";
import { Tag } from "../components/Tag";
import { EmailWriter } from "../components/EmailWriter";
import { Divider } from "../components/Divider";
import { InstructionSection } from "../components/InstructionSection";
import { useNavigate } from "../hooks/use-navigate";
import { useSheet } from "../hooks/use-sheet";
import { ActionType, useAppStore } from "../hooks/use-app-store";
import * as Dialog from "@radix-ui/react-dialog";
import { IEmail, ISheet } from "../core";
import { useDispatch } from "../hooks/use-dispatch";
import { fill } from "../utils";

interface Props {}

export const WriteEmailCard: React.FC<Props> = () => {
  const sheet = useSheet()!;
  const email = useAppStore((state) => state.email);
  const dispatch = useDispatch();
  const [next, back] = useNavigate();

  const emailRef = useRef(email);

  emailRef.current = email;

  const setEmail = useCallback(
    (email: IEmail) => dispatch({ type: ActionType.SetEmail, email }),
    [dispatch]
  );

  const emailDataLabels = ["to", "subject", "body"].map(
    (label) => [label, `email-input:${label}`] as const
  );

  // click on tag, add variable to email and refocus input
  useEffect(() => {
    const listeners: any[] = [];

    emailDataLabels.forEach(([label, dataLabel]) => {
      const emailInput = document.querySelector(`*[data-label="${dataLabel}"]`);
      const listener = (e: any) => {
        console.log(e);
        console.log(e.relatedTarget);

        if (
          e.relatedTarget &&
          e.relatedTarget.getAttribute("data-label") === "tag"
        ) {
          const value = `{{${e.relatedTarget.innerHTML}}}`;
          const newValue: string =
            emailRef.current[label as keyof IEmail]! + value;

          setEmail({
            ...emailRef.current,
            [label]: newValue,
          });
          e.target.focus();
        }
      };

      emailInput?.addEventListener("focusout", listener);

      listeners.push(listener);
    });

    // remove event listeners
    return () => {
      emailDataLabels.forEach(([label, dataLabel], i) => {
        const emailInput = document.querySelector(
          `*[data-label="${dataLabel}"]`
        );

        const listener = listeners[i];
        emailInput?.removeEventListener("focusout", listener);
      });
    };
  }, [emailDataLabels, setEmail]);

  console.log(email);

  return (
    <Card className="relative flex w-full max-w-[974px] h-[584px]">
      <div className="flex flex-col justify-between px-7 pt-9 pb-7 w-full h-full">
        <div className="flex flex-col gap-9">
          <InstructionSection
            icon={PencilIcon}
            header="Write Email"
            text="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit
            amet consectetur."
          />

          <div className="flex flex-wrap gap-2">
            {sheet.headers.map((name) => {
              return <Tag key={name}>{name}</Tag>;
            })}
          </div>
        </div>

        <div>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="secondary" size="lg">
                Preview Emails
              </Button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="DialogOverlay" />

              <Dialog.Content className="DialogContent">
                <EmailPreview email={email} sheet={sheet} />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>

      <Divider variant="vertical" />

      <div className="flex flex-col pt-5 pb-7 px-7 left-img w-full">
        <EmailWriter
          className="w-full h-full"
          email={email}
          onEmailChange={setEmail}
        />
      </div>

      <div className="absolute flex gap-3 right-7 bottom-7">
        <Button variant="secondary" size="lg" onClick={back}>
          Back
        </Button>
        <Button size="lg" onClick={next}>
          Continue
        </Button>
      </div>
    </Card>
  );
};

interface IEmailPreviewProps {
  email: IEmail;
  sheet: ISheet;
}

const EmailPreview: React.FC<IEmailPreviewProps> = ({ email, sheet }) => {
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

  console.log(activeRow);

  const to = fill(email.to, activeRow);
  const subject = fill(email.subject, activeRow);
  const body = fill(email.body, activeRow);

  return (
    <div>
      <button onClick={next}>Next</button>
      <button onClick={back}>Back</button>

      <div>To: {to}</div>
      <div>Subject: {subject}</div>
      <div>Body: {body}</div>
    </div>
  );
};
