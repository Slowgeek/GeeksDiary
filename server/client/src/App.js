import React from "react";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import "./App.css";
import Learning from "./Components/Learning";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {" "}
        <Route exact path="/" component={Learning} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
