import { produce } from "immer";

import { ActionTypes } from "./actions";

export interface ICycle {
  id: string;
  task: string;
  duration: number;
  startDate: Date;
  finishedDate?: Date;
  interruptedDate?: Date;
}

export interface ICyclesState {
  cycles: ICycle[];
  activeCycleId: string | null;
}

export function cyclesReducer(state: ICyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (x) => x.id === state.activeCycleId
      );

      return currentCycleIndex >= 0
        ? produce(state, (draft) => {
            draft.activeCycleId = null;
            draft.cycles[currentCycleIndex].interruptedDate = new Date();
          })
        : state;
    }
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex(
        (x) => x.id === state.activeCycleId
      );

      return currentCycleIndex >= 0
        ? produce(state, (draft) => {
            draft.activeCycleId = null;
            draft.cycles[currentCycleIndex].finishedDate = new Date();
          })
        : state;
    }
    default:
      return state;
  }
}
