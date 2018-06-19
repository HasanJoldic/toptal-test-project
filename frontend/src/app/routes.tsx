import React from "react";
import { Route } from "react-router-dom";

import App from "./App";

export default function getRoutes(store) {
  const { isLoggedIn } = store.getState().auth;

  return (
    <Route component={App}>
    </Route>
  );
}