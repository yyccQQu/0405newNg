import { Auth } from "../domain";
import * as actions from "../actions/auth.action";

export const initialState: Auth = {};

export function reducer(
  state: Auth = initialState,
  action: actions.Actions
): Auth {
  switch (action.type) {
    case actions.ActionTypes.LOGIN_SUCCESS:
    case actions.ActionTypes.REGISTER_SUCCESS: {
      return { ...(<Auth>action.payload) };
    }
    case actions.ActionTypes.LOGIN_FAIL:
    case actions.ActionTypes.REGISTER_FAIL: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getAuth = (state: Auth) => state;
