import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/css/custom.css";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.0.0";

import Index from "views/Index.jsx";
import ConfirmacaoEmail from './views/ConfirmacaoEmail';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={props => <Index {...props} />} />

      <Route exact path="/confirmacao-email/:token" render={props => <ConfirmacaoEmail {...props} />}></Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
