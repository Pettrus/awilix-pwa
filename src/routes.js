import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout, VazioLayout } from "./layouts";

// Route Views
import { Cinema, ConfirmacaoEmail } from './views';

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/nos-cinemas" />
  },
  {
    path: "/nos-cinemas",
    exact: true,
    layout: DefaultLayout,
    component: Cinema
  },
  {
    path: "/confirmacao-email/:token",
    exact: true,
    layout: VazioLayout,
    component: ConfirmacaoEmail
  },
];
