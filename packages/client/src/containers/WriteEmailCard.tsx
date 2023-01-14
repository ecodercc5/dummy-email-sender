import React from "react";
import { Card } from "../components/Card";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Button } from "../components/Button";
import { Tag } from "../components/Tag";
import { EmailWriter } from "../components/EmailWriter";
import { Divider } from "../components/Divider";
import { InstructionSection } from "../components/InstructionSection";
import { useNavigate } from "../hooks/use-navigate";
import { useSheet } from "../hooks/use-sheet";
import { useAppStore } from "../hooks/use-app-store";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {}

export const WriteEmailCard: React.FC<Props> = () => {
  const sheet = useSheet()!;
  const email = useAppStore((state) => state.email);
  const [next, back] = useNavigate();

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
                <EmailPreview />
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
          onEmailChange={() => {}}
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

const EmailPreview = () => {
  return <div>Email Preview</div>;
};
