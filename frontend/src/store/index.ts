
import { Reducer, combineReducers, createStore } from "redux";

import counter from "./counter/reducers"

interface State{
  count: number
}

const reducers: Reducer<State> = combineReducers<State>({
  count: counter
})

const initState = {
  count: 1
}

let store = createStore(reducers, initState);

export default store
export type RootState = State
