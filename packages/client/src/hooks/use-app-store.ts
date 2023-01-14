import create from "zustand";
import { ISheet, IEmail } from "../core";

// states
export enum Step {
  ImportSpreadSheet = "ImportSpreadSheet",
  PreviewSpreadSheet = "PreviewSpreadSheet",
  WriteEmail = "WriteEmail",
  Confirmation = "Confirmation",
  Success = "Success",
}

type SpreadSheetImported = {
  link: string;
  data: ISheet;
  imported: true;
};

type SpreadSheetNotImported = {
  imported: false;
};

export interface IBaseAppState {
  type: Step;
  sheet: SpreadSheetImported | SpreadSheetNotImported;
  email: IEmail;
}

export interface IImportSpreadSheetState extends IBaseAppState {
  type: Step.ImportSpreadSheet;
}

export interface IPreviewSpreadSheetState extends IBaseAppState {
  type: Step.PreviewSpreadSheet;
  sheet: SpreadSheetImported;
}

export interface IWriteEmailState extends IBaseAppState {
  type: Step.WriteEmail;
  sheet: SpreadSheetImported;
}

export interface IConfirmationState extends IBaseAppState {
  type: Step.Confirmation;
  sheet: SpreadSheetImported;
}

export interface ISuccessState extends IBaseAppState {
  type: Step.Success;
  sheet: SpreadSheetImported;
}

export type AppState =
  | IImportSpreadSheetState
  | IPreviewSpreadSheetState
  | IWriteEmailState
  | IConfirmationState
  | ISuccessState;

// actions
export enum ActionType {
  ImportSpreadSheet = "ImportSpreadSheet",
  SelectNewSpreadSheet = "SelectNewSpreadSheet",
  Next = "Next",
  Back = "Back",
  Reset = "Reset",
}

export type ImportSpreadSheetAction = {
  type: ActionType.ImportSpreadSheet;
  link: string;
  data: ISheet;
};

export type SelectNewSpreadSheetAction = {
  type: ActionType.SelectNewSpreadSheet;
};

export type NextAction = {
  type: ActionType.Next;
};

export type BackAction = {
  type: ActionType.Back;
};

export type ResetAction = {
  type: ActionType.Reset;
};

export type Actions =
  | ImportSpreadSheetAction
  | SelectNewSpreadSheetAction
  | NextAction
  | BackAction
  | ResetAction;

const reducer = (state: AppState, action: Actions): Partial<AppState> => {
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
    case ActionType.Reset: {
      if (state.type === Step.Success) {
        return {
          type: Step.ImportSpreadSheet,
          sheet: {
            imported: false,
          },
          email: {
            to: "",
            subject: "",
            body: "",
          },
        };
      }

      return state;
    }
  }
};

interface IDispatch {
  dispatch(action: Actions): void;
}

export const useAppStore = create<AppState & IDispatch>((set) => ({
  type: Step.ImportSpreadSheet,
  sheet: {
    imported: false,
  },
  email: {
    to: "",
    subject: "",
    body: "",
  },
  dispatch: (action) => set((state) => reducer(state, action)),
}));
