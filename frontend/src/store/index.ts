
import { Reducer, combineReducers, createStore } from "redux";

import Counter from "./counter/reducers"
import User, { initUserState } from "./user/reducers"

interface State{
  count: number,
  user: UserState
}

const reducers: Reducer<State> = combineReducers<State>({
  count: Counter,
  user: User
})

const initState = {
  count: 1,
  user: initUserState
}

let store = createStore(reducers, initState);

export default store
