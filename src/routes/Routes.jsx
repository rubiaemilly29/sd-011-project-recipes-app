import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';
import Explorar from '../pages/Explorar';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/perfil" />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/explorar" component={ Explorar } />
    </Switch>
  );
}
