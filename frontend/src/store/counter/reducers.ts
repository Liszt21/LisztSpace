const Counter = (state = 0, action: any) => {
  switch (action.type) {
    case 'INCREMENT':
      console.log(state);
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

export default Counter;
