export const QUOTE = "Quote";
export const QUOTE_SUCCESS = "Quote Success";
export const QUOTE_FAIL = "Quote Fail";

import { Action } from "@ngrx/store";
import { type } from "../utils/type.util";
import { Err, Quote } from "../domain";

export const ActionTypes = {
  QUOTE: type("[Quote] Quote"), //reducer下面得reducer才是想要的action
  QUOTE_SUCCESS: type("[Quote] Quote Success"),
  QUOTE_FAIL: type("[Quote] Quote Fail")
};

export class QuoteAction implements Action {
  type = ActionTypes.QUOTE;

  constructor(public payload: any) {}
}

export class QuoteSuccessAction implements Action {
  type = ActionTypes.QUOTE_SUCCESS;

  constructor(public payload: Quote) {}
}

export class QuoteFailAction implements Action {
  type = ActionTypes.QUOTE_FAIL;

  constructor(public payload: string) {}
}

export type Actions = QuoteAction | QuoteSuccessAction | QuoteFailAction;
