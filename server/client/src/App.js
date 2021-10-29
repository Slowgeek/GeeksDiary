import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Learning from "./Components/Learning";
import DisplayLearning from "./Components/DisplayLearning";
import MyNotes from "./Components/MyNotes";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { reducer, initialState } from "./reducers/useReducer";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/learning" component={Learning} />
          {/* <Route exact path="/editlearning" component={EditLearning} /> */}
          <Route
            exact
            path="/displaylearning/:noteId"
            component={DisplayLearning}
          />
          <Route exact path="/mynotes" component={MyNotes} />
        </Switch>{" "}
      </BrowserRouter>{" "}
    </UserContext.Provider>
  );
}

export default App;
