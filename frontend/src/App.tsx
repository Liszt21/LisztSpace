import React from 'react';
// import './App.css';
// import { DatePicker } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styled from "styled-components";


import Home from "./views/Home";
import Tools from "./views/Tools";
import About from "./views/About";

const NavBar = styled.div`
  margin: 0;
  display: flex;
  font-weight: bold;
  flex-flow: row, nowrap;
  width: 100%;
  justify-content: space-evenly;

  a:hover {
    color: white;
  }
`;
const Main = styled.div`
  width: 100%;
  text-align: center;
`

function App() {
  return (
    <Router>
        <NavBar>
          <Link to="/">Home</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/about">About</Link>
        </NavBar>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/tools">
              <Tools />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Main>
    </Router>
  );
}

export default App;
