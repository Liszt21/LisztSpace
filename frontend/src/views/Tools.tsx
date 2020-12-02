import React, { useState, useEffect } from "react";
import axios from "axios";
import store from "../store"
import { Provider, connect, useSelector, useDispatch } from "react-redux";

interface CounterProps {
  readonly value: number;
}

const Counter = (props: CounterProps) => {
  const { value } = props
  console.log(props)
  const count = useSelector((state: State) => state.count);
  const dispach = useDispatch();

  return (
    <p>
      Clicked: {value} times
      {' '}
      <button onClick={() => dispach({type:"INCREMENT"})}>
        +
      </button>
      {' '}
      <button onClick={() => dispach({type: "DECREMENT"})}>
        -
      </button>
      Count: { count }
    </p>
  )
}
interface State {
  count: number
}

const CCounter = connect((state:State) => {
  return {
    value: state.count
  }
})(Counter)

function Tools() {
  const [ ping, setPing ] = useState("Ping");
  useEffect(()=>{
    axios.get("http://localhost:5000/api/ping")
      .then(function (response) {
        setPing(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])
  
  return (
    <>
      <p>{ping}</p>
      <Provider store={store}>
        <CCounter />
      </Provider>
      
    </>
  )
}

export default Tools;
