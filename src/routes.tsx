import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Routes() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/team/1">Team Test</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact>
            <h1>teams</h1>
          </Route>
          <Route path="/team/:id">
            <h1>detail</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
