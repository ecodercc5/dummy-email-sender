import React from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { InstructionSection } from "../components/InstructionSection";
import { SheetTable } from "../components/SheetTable";
import { useNavigate } from "../hooks/use-navigate";
import { useSheet } from "../hooks/use-sheet";
import * as Dialog from "@radix-ui/react-dialog";
import { SquareIconButton } from "../components/SquareIconButton";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

interface Props {}

export const PreviewTableCard: React.FC<Props> = () => {
  const sheet = useSheet()!;
  const [next, back] = useNavigate();

  return (
    <Card className="relative flex flex-col w-full max-w-[974px] h-[584px] overflow-y-hidden">
      <div className="flex flex-col gap-7 pt-9 pb-7 w-full h-full">
        <div className="flex flex-col h-full">
          <InstructionSection
            className="px-7"
            icon={TableCellsIcon}
            header="Preview Spreadsheet"
            text="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur."
          />

          <div className="flex flex-col h-full flex-1">
            <div className="px-7">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <SquareIconButton
                    className="ml-auto relative top-2"
                    icon={ArrowsPointingOutIcon}
                  />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="DialogOverlay" />
                  <Dialog.Content className="DialogContent rounded-br-md rounded-bl-md overflow-scroll">
                    <Dialog.Close asChild>
                      <SquareIconButton
                        className="ml-auto mb-4"
                        icon={ArrowsPointingInIcon}
                      />
                    </Dialog.Close>
                    <div className="h-full min-h-0">
                      <SheetTable className="w-full" sheet={sheet} />
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>

            <div className="overflow-scroll px-7 py-6 h-full">
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
