import { Injectable } from "@angular/core";
import { Actions, Effect, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import * as actions from "../actions/quote.action";
import { QuoteService } from "../services/quote.service";

@Injectable()
export class QuoteEffects {
  @Effect()
  quote$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.QUOTE)
    .map(toPayload)
    .switchMap(_ =>
      this.service$
        .getQuote()
        .map(q => new actions.QuoteSuccessAction(q))
        .catch(err =>
          Observable.of(new actions.QuoteFailAction(JSON.stringify(err)))
        )
    );

  constructor(private actions$: Actions, private service$: QuoteService) {}
}
