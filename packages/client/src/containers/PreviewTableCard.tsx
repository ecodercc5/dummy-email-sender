import React from "react";
import { Card } from "../components/Card";
import { TableCellsIcon } from "@heroicons/react/20/solid";
import { Button } from "../components/Button";
import { InstructionSection } from "../components/InstructionSection";
import { SheetTable } from "../components/SheetTable";
import { useNavigate } from "../hooks/use-navigate";
import { useSheet } from "../hooks/use-sheet";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {}

export const PreviewTableCard: React.FC<Props> = () => {
  const sheet = useSheet()!;
  const [next, back] = useNavigate();

  return (
    <Card className="relative flex flex-col w-full max-w-[974px] h-[584px] overflow-y-hidden">
      <div className="flex flex-col gap-9 px-7 pt-9 pb-7 w-full h-full">
        <div className="flex flex-col gap-7 h-full">
          <InstructionSection
            icon={TableCellsIcon}
            header="Preview Spreadsheet"
            text="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur."
          />

          <div className="flex flex-col h-full flex-1">
            <Dialog.Root>
              <Dialog.Trigger>
                <button
                  onClick={() => {
                    console.log("yo");
                  }}
                >
                  Expand
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                  <Dialog.Close>
                    <button>Close</button>
                  </Dialog.Close>
                  <SheetTable className="w-full" sheet={sheet} />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <div className="overflow-scroll">
              <SheetTable className="w-full" sheet={sheet} />
            </div>
          </div>
        </div>
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
