import create from "zustand";
import { ISheet } from "../core";

export enum Step {
  ImportSpreadSheet = "ImportSpreadSheet",
  PreviewSpreadSheet = "PreviewSpreadSheet",
  WriteEmail = "WriteEmail",
  Confirmation = "Confirmation",
  Success = "Success",
}

enum ActionType {
  ImportSpreadSheet = "ImportSpreadSheet",
  SelectNewSpreadSheet = "SelectNewSpreadSheet",
  Next = "Next",
  Back = "Back",
}

type Actions = {
  importSpreadSheet(link: string, data: ISheet): void;
  selectNewSpreadSheet(): void;
  canContinue(): boolean;
  next(): void;
  back(): void;
};

type SpreadSheetImported = {
  link: string;
  data: ISheet;
  imported: true;
};

type SpreadSheetNotImported = {
  imported: false;
};

type Email = {
  to: string;
  subject: string;
  body: string;
};

type ImportSpreadSheetBaseState = { type: Step.ImportSpreadSheet };
type PreviewSpreadSheetBaseState = { type: Step.PreviewSpreadSheet };
type WriteEmailBaseState = { type: Step.WriteEmail };
type ConfirmationBaseState = { type: Step.Confirmation };
type SuccessBaseState = { type: Step.Success };

type SpreadSheetImportedState = ImportSpreadSheetBaseState & {
  sheet: SpreadSheetImported;
  email: Email;
};

type SpreadSheetNotImportedState = ImportSpreadSheetBaseState & {
  sheet: SpreadSheetNotImported;
  email: Email;
};

type ImportSpreadSheetState =
  | SpreadSheetImportedState
  | SpreadSheetNotImportedState;

type PreviewSpreadSheetState = PreviewSpreadSheetBaseState &
  SpreadSheetImported;

type WriteEmailState = WriteEmailBaseState & SpreadSheetImported;
type ConfirmationState = ConfirmationBaseState & SpreadSheetImported;
type SuccessState = SuccessBaseState & SpreadSheetImported;

type AppState =
  | ImportSpreadSheetState
  | PreviewSpreadSheetState
  | WriteEmailState
  | ConfirmationState
  | SuccessState;

type ImportSpreadSheetAction = {
  type: ActionType.ImportSpreadSheet;
  link: string;
  data: ISheet;
};

type SelectNewSpreadSheetAction = {
  type: ActionType.SelectNewSpreadSheet;
};

type NextAction = {
  type: ActionType.Next;
};

type BackAction = {
  type: ActionType.Back;
};

type Actions_ =
  | ImportSpreadSheetAction
  | SelectNewSpreadSheetAction
  | NextAction
  | BackAction;

// type Actions =

const reducer = (state: AppState, action: Actions_): Partial<AppState> => {
  switch (action.type) {
    case ActionType.ImportSpreadSheet: {
      const { data, link } = action;
      if (state.type === Step.ImportSpreadSheet && !state.sheet.imported) {
        return {
          sheet: {
            imported: true,
            data,
            link,
          },
        };
      }

      return state;
    }
    case ActionType.SelectNewSpreadSheet: {
      if (state.type === Step.ImportSpreadSheet && state.sheet.imported) {
        return {
          sheet: {
            imported: false,
          },
        };
      }

      return state;
    }
    case ActionType.Next: {
      switch (state.type) {
        case Step.ImportSpreadSheet: {
          if (!state.sheet.imported) {
            return state;
          }

          return {
            type: Step.PreviewSpreadSheet,
          };
        }
        case Step.PreviewSpreadSheet: {
          return {
            type: Step.WriteEmail,
          };
        }
        case Step.WriteEmail: {
          // check conditionals
          return {
            type: Step.Confirmation,
          };
        }
        case Step.Confirmation: {
          return {
            type: Step.Success,
          };
        }
      }

      return state;
    }
    case ActionType.Back: {
      switch (state.type) {
        case Step.PreviewSpreadSheet: {
          return {
            type: Step.ImportSpreadSheet,
          };
        }
        case Step.WriteEmail: {
          return {
            type: Step.PreviewSpreadSheet,
          };
        }
        case Step.Confirmation: {
          return {
            type: Step.WriteEmail,
          };
        }
      }
      return state;
    }
  }
};

export const useAppStore = create<AppState & Actions>((set, get) => ({
  type: Step.ImportSpreadSheet,
  sheet: {
    imported: false,
  },
  email: {
    to: "",
    subject: "",
    body: "",
  },
  importSpreadSheet: (link, data) =>
    set((state) => {
      if (state.type === Step.ImportSpreadSheet && !state.sheet.imported) {
        const newState: Partial<SpreadSheetImportedState> = {
          type: Step.ImportSpreadSheet,
          sheet: {
            imported: true,
            link,
            data,
          },
        };

        return newState;
      }
      return state;
    }),
  selectNewSpreadSheet: () =>
    set((state) => {
      if (state.type === Step.ImportSpreadSheet && state.sheet.imported) {
        return {
          sheet: {
            imported: false,
          },
        };
      }

      return state;
    }),
  canContinue: () => {
    const state = get();

    switch (state.type) {
      case Step.ImportSpreadSheet: {
        return state.sheet.imported;
      }
      default:
        return false;
    }
  },
  next: () => {},
  back: () => {},
}));

// importSpreadSheet: (googleSheetLink, sheet) =>
//     set((state) => {
//       if (state.type === Step.ImportSpreadSheet && !state.sheet.imported) {
//         const { sheetImported, ...rest } = state;

//         return {

//         } as SpreadSheetImportedState;
//       }
//       return state;
//     }),
//   selectNewSpreadSheet: () =>
//     set((state) => {
//       if (state.type === Step.ImportSpreadSheet && state.sheetImported) {
//         const { sheet, googleSheetLink, ...rest } = state;

//         return {
//           ...rest,
//           type: Step.ImportSpreadSheet,
//           sheetImported: false,
//         };
//       }

//       return state;
//     }),
//   canContinue: () => {
//     const state = get();

//     switch (state.type) {
//       case Step.ImportSpreadSheet: {
//         return state.sheetImported;
//       }
//       default:
//         return false;
//     return false
//     }
//   },
//   next: () =>
//     set((state) => {
//       if (state.type === Step.ImportSpreadSheet) {
//         if (state.canContinue()) {
//           const { type, ...rest } = state as SpreadSheetImportedState;

//           return {
//             ...rest,
//             type: Step.PreviewSpreadSheet,
//           } as PreviewSpreadSheetState;
//         }

//         return state;
//       }

//       return state;
//     }),
//   back: () =>
//     set((state) => {
//       switch (state.type) {
//         case Step.PreviewSpreadSheet:
//           return {
//             ...state,
//             type: Step.ImportSpreadSheet,
//           } as SpreadSheetImportedState;
//       }

//       return state;
//     }),
