import React from "react";
import { Route } from "react-router-dom";

import Cms from "./Cms";

export default function getRoutes(store) {
  const { isLoggedIn } = store.getState().auth;

  return (
    <Route component={Cms}>
    </Route>
  );
}