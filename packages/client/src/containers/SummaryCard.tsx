import React from "react";
import { Card } from "../components/Card";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "../components/Button";
import { EmailWriter } from "../components/EmailWriter";
import { Divider } from "../components/Divider";
import { SummaryDetail } from "../components/SummaryDetail";
import { InstructionSection } from "../components/InstructionSection";
import { useNavigate } from "../hooks/use-navigate";
import { useSheet } from "../hooks/use-sheet";
import { useAppStore } from "../hooks/use-app-store";
import useSWRMutation from "swr/mutation";

interface Props {}

export const SummaryCard: React.FC<Props> = () => {
  const sheet = useSheet()!;
  const email = useAppStore((state) => state.email);
  const [next, back] = useNavigate();

  const { trigger, isMutating } = useSWRMutation("/api/emails", () => {
    console.log("sending fake emails");

    return new Promise((resolve) => {
      setTimeout(resolve, 2500);
    });
  });

  const handleSendEmails = () => {
    trigger().then(next);
  };

  return (
    <Card className="relative flex w-full max-w-[974px] h-[584px]">
      <div className="flex flex-col justify-between px-7 pt-9 pb-7 w-1/2 h-full">
        <div className="flex flex-col gap-9">
          <InstructionSection
            icon={PencilIcon}
            header="Summary"
            text="Review your contacts and emails before bulk sending."
          />
        </div>

        <div className="flex flex-col gap-6">
          <SummaryDetail label="Sheet ID" detail={sheet.id} />
          <SummaryDetail label="Sheet Name" detail="Sheet 1" />
          <SummaryDetail
            label="Number of Contacts"
            detail={`${sheet.rows.length}`}
          />
        </div>
      </div>

      <Divider variant="vertical" />

      <div className="flex flex-col pt-5 pb-7 px-7 left-img w-full flex-1">
        <EmailWriter
          className="w-full h-full"
          email={email}
          onEmailChange={() => {}}
        />
      </div>

      <div className="absolute flex gap-3 right-7 bottom-7">
        <Button variant="secondary" size="lg" onClick={back}>
          Back
        </Button>
        <Button size="lg" onClick={handleSendEmails}>
          Send Emails {isMutating && "Loadingggg"}
        </Button>
      </div>
    </Card>
  );
};
