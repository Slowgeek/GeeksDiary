import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, useHistory, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Learning from "./Components/Learning";
import EditLearning from "./Components/EditLearning";
import DisplayLearning from "./Components/DisplayLearning";
import MyNotes from "./Components/MyNotes";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/Protected/ProtectedRoutes";
import { reducer, initialState } from "./reducers/useReducer";
import TodayRevisionNotes from "./Components/TodayRevisionNotes";
import SawoLogin from "./Components/SawoLogin";
import Relogin from "./Components/Relogin";

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Relogin />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/sawo" component={SawoLogin} />
          <ProtectedRoute exact path="/learning" component={Learning} />
          <ProtectedRoute
            exact
            path="/editlearning/:noteId"
            component={EditLearning}
          />
          <ProtectedRoute
            exact
            path="/displaylearning/:noteId"
            component={DisplayLearning}
          />
          <ProtectedRoute exact path="/mynotes" component={MyNotes} />
          <ProtectedRoute
            exact
            path="/todaynotes"
            component={TodayRevisionNotes}
          />
        </Switch>{" "}
        <ToastContainer />
      </BrowserRouter>{" "}
    </UserContext.Provider>
  );
}

export default App;
