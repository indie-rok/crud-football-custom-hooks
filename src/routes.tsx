import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Menu from "./components/Menu";

import Teams from "./screens/Teams";
import TeamDetail from "./screens/TeamDetail";

export default function Routes() {
  return (
    <Router>
      <>
        <Menu />

        <Switch>
          <Route path="/" exact>
            <Teams />
          </Route>
          <Route path="/team/:id">
            <TeamDetail />
          </Route>
        </Switch>
      </>
    </Router>
  );
}
