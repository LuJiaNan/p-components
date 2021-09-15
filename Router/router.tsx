import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { router } from "./routerConfig";

export default function RouterDom() {
  return (
    <>
      {router.map(item =>
        item.redirect === true ? (
          <Redirect path={item.path} to={item.to} key={item.path} />
        ) : (
          <Route path={item.path} component={item.component} key={item.path} />
        )
      )}
    </>
  );
}
