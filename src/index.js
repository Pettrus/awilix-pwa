import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/css/custom.css";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";

import Index from "views/Index.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" render={props => <Index {...props} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
