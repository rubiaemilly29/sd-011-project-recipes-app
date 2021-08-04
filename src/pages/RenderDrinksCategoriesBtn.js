import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { fetchSearchBtnIngredients, clearData } from '../redux/actions/searchBarActions';

function RenderDrinksCategoriesBtn({ filterByIngredients, clearDrinkData }) {
  const [categoryBtn, setCategoryBtn] = useState(undefined);
  const [toggleDrinks, setToggleDrinks] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchCategoryList = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const json = await response.json();
      setCategoryBtn(json);
    };
    fetchCategoryList();
  }, []);

  useEffect(() => {
    if (toggleDrinks) {
      filterByIngredients(toggleDrinks, pathname);
    } else {
      clearDrinkData();
    }
  }, [toggleDrinks, clearDrinkData, pathname, filterByIngredients]);

  const handleClick = ({ target }) => {
    if (target.value === toggleDrinks) {
      setToggleDrinks('');
    } else {
      setToggleDrinks(target.value);
    }
  };

  const handleRenderBtn = () => {
    const maxLength = 5;

    if (categoryBtn) {
      const renderBtn = categoryBtn.drinks.map((category, index) => {
        if (index < maxLength) {
          return (
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ index }
              value={ category.strCategory }
              onClick={ (e) => handleClick(e) }
            >
              { category.strCategory }
            </button>
          );
        }
        return null;
      });
      return renderBtn;
    }
  };
  return (
    <div>
      { handleRenderBtn() }
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  filterByIngredients: (searchIngredient,
    pathname) => dispatch(fetchSearchBtnIngredients(searchIngredient, pathname)),
  clearDrinkData: () => dispatch(clearData()),
});

export default connect(null, mapDispatchToProps)(RenderDrinksCategoriesBtn);

RenderDrinksCategoriesBtn.propTypes = {
  filterByIngredients: PropTypes.func.isRequired,
  clearDrinkData: PropTypes.func.isRequired,
};
