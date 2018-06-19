import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Digital } from "react-activity";

// We need to import rxjs explicitly to get all the operators (filter, map, scan..) on observables.
// The root file is sufficient for importing the module.
import "rxjs";

import store, { persistor } from "./store/store";
import getRoutes from "./routes";
const routes = getRoutes(store);

import StatusWrapper from "./decorators/StatusWrapper";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Digital color="#727981" size={32} speed={1} animating={true} />}
      persistor={persistor}>
      <Router>
        {routes}
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("app"),
);

module.hot.accept();
