import { ActionType } from "redux/constants/demo"

export interface IReducer {
  type: ActionType;
  payload: number;
}

export interface ICounter {
  result: number;
}