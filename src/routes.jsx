import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Product from "pages/product";
import ProductDetail from "pages/product-detail";
import { Alert } from "components/alert";

const Routes = () => (
  <Router>
    <Alert />
    <Switch>
      <Route exact path="/product" component={Product} />
      <Route exact path="/product/:productId" component={ProductDetail} />
      <Redirect to="/product" />
    </Switch>
  </Router>
);

export default Routes;
