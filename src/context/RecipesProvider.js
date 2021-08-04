import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchMeals } from '../services/meailAPI';
import { fetchCocktails } from '../services/cocktailAPI';

function RecipesProvider({ children }) {
  const [drinksData, setDrinksData] = useState([]);
  const [mealsData, setMealsData] = useState([]);
  const [btnName, setBtnName] = useState('');
  const [toggle, setToggle] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('All');

  useEffect(() => {
    async function fetchMyAPI() {
      const responseMeals = await fetchMeals();
      setMealsData(responseMeals);
      const responseDrinks = await fetchCocktails();
      setDrinksData(responseDrinks);
    }
    fetchMyAPI();
  }, []);

  async function resetFilter() {
    const defaultMeals = await fetchMeals();
    setMealsData(defaultMeals);
    setCurrentCategory('All');
    const defaultDrinks = await fetchCocktails();
    setDrinksData(defaultDrinks);
  }

  function handleToggle(name) {
    if (!toggle) {
      setBtnName(name);
      setToggle(true);
    } if (toggle && name === btnName) {
      setToggle(false);
      resetFilter();
    } if (toggle && name !== btnName) {
      setBtnName(name);
    }
  }

  const context = {
    drinksData,
    setDrinksData,
    mealsData,
    setMealsData,
    resetFilter,
    toggle,
    setToggle,
    handleToggle,
    currentCategory,
    setCurrentCategory,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;