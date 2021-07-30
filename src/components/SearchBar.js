import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';
import searchCase from '../service/apiSearchBar';

function SearchBar({ mealOrDrink }) {
  const stateReduxSearch = useSelector(({ searchItems }) => searchItems);
  console.log(stateReduxSearch);
  const [search, setSearch] = React.useState('');
  const [radioQuery, setRadioQuery] = React.useState('');
  const dispatch = useDispatch();
  const { dataApi } = stateReduxSearch;
  const comidasOuBebidas = mealOrDrink === 'meal' ? 'comidas' : 'bebidas';
  const mealsOrDrinks = mealOrDrink === 'meal' ? 'meals' : 'drinks';
  const idMealOrIdDrink = mealOrDrink === 'meal' ? 'idMeal' : 'idDrink';

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar Receita"
        data-testid="search-input"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        value="ingrediente"
        onChange={ ({ target }) => setRadioQuery(target.value) }
        name="cases"
      />
      Ingrediente
      <input
        type="radio"
        data-testid="name-search-radio"
        value="nome"
        onChange={ ({ target }) => setRadioQuery(target.value) }
        name="cases"
      />
      Nome
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        value="primeiraletra"
        onChange={ ({ target }) => {
          setRadioQuery(target.value);
          if (search.length > 1) {
            alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
          }
        } }
        name="cases"
      />
      Primeira letra
      <button
        type="button"
        onClick={ async () => {
          if (search.length > 1 && radioQuery === 'primeiraletra') {
            alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
          }

          dispatch(await searchCase(mealOrDrink, radioQuery, search));
        } }
      >
        Buscar
      </button>
      {stateReduxSearch.giveId
        && (
          <Redirect
            to={ `/${comidasOuBebidas}/${dataApi[mealsOrDrinks][0][idMealOrIdDrink]}` }
          />
        )}
    </div>
  );
}

SearchBar.propTypes = {
  mealOrDrink: PropTypes.string.isRequired,
};

export default SearchBar;
