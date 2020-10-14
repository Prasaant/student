import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { getBreadcrumbs } from "react-breadcrumbs-light";
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  withRouter
} from "react-router-dom";

/* ------------------------------------------------------------------- */
/*                              Routes
/* ------------------------------------------------------------------- */

const routes = [
  { link: "/" },
  {
    link: "/home",
    children: [
      { link: "/home/settings" },
      { link: "/home/clients", children: [{ link: "/home/clients/:id" }] }
    ]
  }
];

/* ------------------------------------------------------------------- */
/*                        Custom breadcrumbs
/* ------------------------------------------------------------------- */

const CustomCrumbs = ({ location }) => {
  // Get current breadcrumbs
  const crumbs = getBreadcrumbs(routes, window.location.pathname);

  // Render
  return (
    <ul style={{ display: "flex", listStyle: "none" }}>
      {crumbs.map((item, i, arr) =>
        i !== arr.length - 1 ? (
          <Fragment key={i}>
            <li>
              <Link to={item.link}>{item.title}</Link>
            </li>
            <li style={{ margin: "0 4px" }}> / </li>
          </Fragment>
        ) : (
          <li key={i}>{item.title}</li>
        )
      )}
    </ul>
  );
};

const RoutedCustomCrumbs = withRouter(CustomCrumbs);

/* ------------------------------------------------------------------- */
/*                             Pages
/* ------------------------------------------------------------------- */

const Root = () => (
  <div>
    <div>You're at Root page</div>

    <Link to="/home">Go to Home</Link>
  </div>
);

const Home = () => (
  <div>
    <div>You're at Home page</div>

    <Link to="/home/settings">Go to Settings</Link>
    <br />
    <Link to="/home/clients">Go to Clients</Link>
  </div>
);

const Settings = () => (
  <div>
    <div>You're at Settings page</div>

    <Link to="/">Go to Root</Link>
  </div>
);

const Clients = () => (
  <div>
    <div>You're at all clients page</div>

    <Link to="/home/clients/Some client">Go to client</Link>
  </div>
);

const Client = () => (
  <div>
    <div>You're at some client's page</div>

    <Link to="/">Go to Root</Link>
    <br />
    <Link to={window.location.pathname + "/notFound"}>
      Go to Not Found Page
    </Link>
  </div>
);

const NotFound = () => (
  <div>
    <div>You're at Not Found Page</div>

    <Link to="/">Go to Root</Link>
  </div>
);

/* ------------------------------------------------------------------- */
/*                               App
/* ------------------------------------------------------------------- */

const Hello = () => (
  <BrowserRouter>
    <div style={{ margin: "-8px 0 0 -8px" }}>
      <RoutedCustomCrumbs />

      <Switch>
        <Route exact path="/" component={Root} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/home/settings" component={Settings} />
        <Route exact path="/home/clients" component={Clients} />
        <Route exact path="/home/clients/:id" component={Client} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);
