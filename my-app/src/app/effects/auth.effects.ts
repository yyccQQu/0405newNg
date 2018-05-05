import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import * as actions from "../actions/auth.action";
import { AuthService } from "../services/Auth.service";
import { go } from "@ngrx/router-store";

@Injectable()
export class AuthEffects {
  @Effect()
  Login$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap((val: { email: string; password: string }) =>
      this.service$
        .login(val.email, val.password)
        .map(auth => new actions.LoginSuccessAction(auth))
        .catch(err =>
          Observable.of(new actions.LoginFailAction(JSON.stringify(err)))
        )
    );

  /**
   *
   */
  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER)
    .map(toPayload)
    .switchMap(val =>
      this.service$
        .register(val)
        .map(auth => new actions.RegisterSuccessAction(auth))
        .catch(err => of(new actions.RegisterFailAction(err)))
    );

  @Effect()
  loginAndHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGIN_SUCCESS)
    .map(() => go(["/projects"]));

  @Effect()
  registerAndHome$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.REGISTER_SUCCESS)
    .map(() => go(["/projects"]));

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOGOUT)
    .map(() => go(["/"]));

  constructor(private actions$: Actions, private service$: AuthService) {}
}
