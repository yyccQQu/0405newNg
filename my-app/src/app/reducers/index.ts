import { NgModule } from "@angular/core";
import { environment } from "../../environments/environment";
/**
 * combineReducers 接收一系列的 reducer 作为参数，然后创建一个新的 reducer
 * 这个新的 reducer 接收到各 reducer 的值后，按 reducer 的 key 进行存储。
 * 把这个新的 reducer 想象成一个数据库，各个子 reducer 就像数据库中的表。
 *
 */
import { StoreModule, combineReducers, ActionReducer } from "@ngrx/store";
import { RouterStoreModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { storeFreeze } from "ngrx-store-freeze";
/**
 * compose 函数是一个很方便的工具，简单来说，它接受任意数量的函数作为参数，然后返回一个新的函数。
 * 这个新的函数其实就是前面的函数的叠加，比如说，我们给出 `compose(f(x), g(x))`, 返回的新函数
 * 就是 `g(f(x))`。
 */
import { compose } from "@ngrx/core/compose";
/**
 * 分别从每个 reducer 中将需要导出的函数或对象进行导出，并起个易懂的名字
 */
import * as fromQuote from "./quote.reducer";

//可以帮我们把任意的两个函数组合到一起，形成有缓存的方式
import { createSelector } from "reselect";

export interface State {
  //全局state
  quote: fromQuote.State;
}

const initialState: State = {
  //全局初始值
  quote: fromQuote.initialState
};

const reducers = {
  quote: fromQuote.reducer
};

const productionReducers: ActionReducer<State> = combineReducers(reducers);
// const developmentReducers: ActionReducer<State> = combineReducers(storeFreeze(reducers))
const developmentReducers: ActionReducer<State> = compose(
  storeFreeze,
  combineReducers
)(reducers);

export function reducer(
  state = initialState,
  action: { type: string; payload: any }
): State {
  return environment.production
    ? productionReducers(state, action)
    : developmentReducers(state, action);
}

export const getQuoteState = (state: State) => state.quote;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

@NgModule({
  imports: [
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ]
})
export class AppStoreModule {}
