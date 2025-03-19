export type DataReducerState<T> = {
  data: T;
  visible: boolean;
};

type DataDialogAction<T> =
  | { type: "CLOSE_DIALOG" }
  | { type: "OPEN_DIALOG"; payload: T };

// Dialogs with data
export const DataDialogsReducer = <T extends object>(
  state: DataReducerState<T>,
  action: DataDialogAction<T>,
): DataReducerState<T> => {
  switch (action.type) {
    case "OPEN_DIALOG":
      return { ...state, visible: true, data: action.payload };
    case "CLOSE_DIALOG":
      return { ...state, data: {} as T, visible: false };
    default:
      return state;
  }
};

type ReducerState = { id: number; visible?: boolean };

export type DialogAction =
  | { type: "CLOSE_DIALOG" }
  | { type: "OPEN_DIALOG"; payload: number };

// Dialogs with id only
export const DialogsReducer = (
  state: ReducerState,
  action: DialogAction,
): ReducerState => {
  if (action.type === "OPEN_DIALOG")
    return { ...state, visible: true, id: action.payload };
  if (action.type === "CLOSE_DIALOG") return { id: 0, visible: false };

  return state;
};

type KanbanReducerState = {
  data: { id: number; stageId: number };
  visible: boolean;
};

type KanbanDialogAction =
  | { type: "CLOSE_DIALOG" }
  | { type: "OPEN_DIALOG"; payload: { id: number; stageId: number } };

// Dialogs for kanban
export const KanbanDialogsReducer = (
  state: KanbanReducerState,
  action: KanbanDialogAction,
): KanbanReducerState => {
  if (action.type === "OPEN_DIALOG")
    return { ...state, visible: true, data: action.payload };
  if (action.type === "CLOSE_DIALOG")
    return { visible: false, data: { id: 0, stageId: 0 } };

  return state;
};

export type SidebarAction =
  | { type: "CLOSE_SIDEBAR" }
  | { type: "OPEN_SIDEBAR"; payload: number };

export const SidebarsReducer = (
  state: ReducerState,
  action: SidebarAction,
): ReducerState => {
  if (action.type === "OPEN_SIDEBAR")
    return { visible: true, id: action.payload };
  if (action.type === "CLOSE_SIDEBAR") return { id: 0, visible: false };

  return state;
};
