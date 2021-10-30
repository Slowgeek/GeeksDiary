import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Learning from "./Components/Learning";
import EditLearning from "./Components/EditLearning";
import DisplayLearning from "./Components/DisplayLearning";
import MyNotes from "./Components/MyNotes";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Relogin from "./Components/Relogin";
import { reducer, initialState } from "./reducers/useReducer";
import TodayRevisionNotes from "./Components/TodayRevisionNotes";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Relogin />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/learning" component={Learning} />
          {/* <Route exact path="/editlearning" component={EditLearning} /> */}
          <Route exact path="/editlearning/:noteId" component={EditLearning} />
          <Route
            exact
            path="/displaylearning/:noteId"
            component={DisplayLearning}
          />
          <Route exact path="/mynotes" component={MyNotes} />
          <Route exact path="/todaynotes" component={TodayRevisionNotes} />
        </Switch>{" "}
      </BrowserRouter>{" "}
    </UserContext.Provider>
  );
}

export default App;
