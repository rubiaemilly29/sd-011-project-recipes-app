import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesBar from '../components/CategoriesBar';

function Drinks() {
  const { drinksData } = useContext(RecipesContext);

  // useEffect(() => {

  // }, []);

  return (
    <div>
      { drinksData.length === 1
        && <Redirect to={ `/bebidas/${drinksData[0].idDrink}` } /> }
      <Header title="Bebidas" recipeType="drinks" searchButton />
      <CategoriesBar recipeType="bebidas" />
      { drinksData !== [] && drinksData.map((recipe, index) => (
        <Link
          to={ `/bebidas/${recipe.idDrink}` }
          key={ recipe.idDrink }
        >
          <RecipeCard
            recipe={ recipe }
            index={ index }
          />
        </Link>
      )) }
      <Footer />
    </div>
  );
}

export default Drinks;