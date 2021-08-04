import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoodOrDrink({ history }) {
  function comidasHeaderAndMain() {
    return (
      <>
        <Header withSearch={ false } pageTitle="Explorar Comidas" />
        <br />
        <main data-testid="recipes-page">
          <h1>Tela de Explorar Comidas</h1>
          &nbsp;  &nbsp;  &nbsp;
        </main>
      </>
    );
  }

  function bebidasHeaderAndMain() {
    return (
      <>
        <Header withSearch={ false } pageTitle="Explorar Bebidas" />
        <br />
        <main data-testid="recipes-page">
          <h1>Tela de Explorar Bebidas</h1>
          &nbsp;  &nbsp;  &nbsp;
        </main>
      </>
    );
  }

  return (
    <>
      {history.location.pathname === '/explorar/comidas'
        ? comidasHeaderAndMain() : bebidasHeaderAndMain() }
      <Footer />
    </>
  );
}

ExploreFoodOrDrink.propTypes = {
  history: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;

export default ExploreFoodOrDrink;
