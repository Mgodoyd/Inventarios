import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Administrador from './components/Administrador/Administrador';
import Operador from './components/Operador/Operador';
import Login from './components/Login/Login';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/admin">
          {localStorage.getItem('isAdmin') === 'true' ? (
            <Administrador />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/operador">
          {localStorage.getItem('isAdmin') === 'false' ? (
            <Operador />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;