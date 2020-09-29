import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Institucional from '../pages/Institucional';
import Login from '../pages/Login';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Institucional} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default Routes;
