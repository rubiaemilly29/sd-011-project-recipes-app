import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import DetailsRecipe from './pages/DetailsRecipe';
import Perfil from './components/Perfil';
import RecipesProgress from './components/RecipesProgress';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Recipes } />
      <Route exact path="/Bebidas" component={ Recipes } />
      <Route exatc path="/comidas/:id" component={ DetailsRecipe } />
      <Route path="/bebidas/:id" component={ DetailsRecipe } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route
        exact
        path="/progress"
        render={ (props) => <RecipesProgress { ...props } /> }
      />
    </Switch>
  );
}
