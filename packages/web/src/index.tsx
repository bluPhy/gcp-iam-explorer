import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const ScrollToTop: React.FC = () => {
  const history = useHistory();

  React.useEffect(() => {
    if (history.action === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [history.location.pathname, history.action]);

  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const gtag: any;
const Tracker: React.FC = () => {
  const history = useHistory();

  React.useEffect(() =>
    history.listen((_location, _action) => {
      if (process.env.NODE_ENV === "production") {
        gtag("event", "page_view");
      }
    }),
  );

  return null;
};

const rootElement = document.getElementById("root");
const renderOrHydrate = rootElement?.hasChildNodes() ? render : hydrate;
renderOrHydrate(
  <Router>
    <CssBaseline />
    <ScrollToTop />
    <Tracker />
    <App />
  </Router>,
  rootElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
