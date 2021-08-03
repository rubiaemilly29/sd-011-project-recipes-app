import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './RecipeDetails.css';
import PropTypes from 'prop-types';
import BtnStartRecipe from '../components/BtnStartRecipe';
import BtnShare from '../components/BtnShare';
import { fetchById, fetchByAll } from '../service/FetchAPIs';

const mgc6 = 6;
const mgc16 = 16;
const mgc21 = 21;

const RecipeDetails = ({ type, match }) => {
  const { recipeId } = match.params;
  const [recipe, setRecipe] = useState({});
  const [ings, setIngs] = useState([]);
  const [mealVideo, setVideo] = useState('');
  const [recomendations, setRecs] = useState([]);
  useEffect(() => {
    const getRecipe = async () => {
      const result = await fetchById(type, recipeId);
      const recs = await type === 'comida'
        ? await fetchByAll('bebida') : await fetchByAll('comida');
      setRecipe(result[0]);
      setRecs(recs);
    };
    getRecipe();
  }, []);

  useEffect(() => {
    const getIngs = async () => {
      const ingsArr = [];
      const ingsLimit = type === 'comida' ? mgc21 : mgc16;
      for (let i = 1; i < ingsLimit; i += 1) {
        const currIng = recipe[`strIngredient${i}`];
        if (currIng) {
          const currMeas = recipe[`strMeasure${i}`];
          ingsArr.push({ ing: currIng, meas: currMeas });
        }
      }
      setIngs(ingsArr);
    };
    getIngs();
    if (Object.keys(recipe).length !== 0 && type === 'comida') {
      const vidEndPoint = recipe.strYoutube.split('=')[1];
      setVideo(`https://www.youtube-nocookie.com/v/${vidEndPoint}`);
    }
  }, [recipe]);

  const renderRecomendations = () => (
    <Carousel className="rec-carousel" variant="dark">
      {recomendations.slice(0, mgc6).map((r, i) => {
        const thumb = type === 'comida' ? r.strDrinkThumb : r.strMealThumb;
        const recName = type === 'comida' ? r.strDrink : r.strMeal;
        return (
          <Carousel.Item key={ `rec-${i}` } data-testid={ `${i}-recomendation-card` }>
            <img src={ thumb } alt={ recName } className="w-100" />
            <Carousel.Caption>
              <h5 data-testid={ `${i}-recomendation-title` }>{ recName }</h5>
            </Carousel.Caption>
          </Carousel.Item>);
      })}
    </Carousel>
  );

  const recipeInfo = () => {
    const thumb = type === 'comida' ? recipe.strMealThumb : recipe.strDrinkThumb;
    const recpName = type === 'comida' ? recipe.strMeal : recipe.strDrink;
    const recpCat = type === 'comida' ? recipe.strCategory : recipe.strAlcoholic;
    return (
      <div>
        <img
          src={ thumb }
          alt={ recpName }
          className="dtl-img"
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{ recpName }</h2>
        <h4 data-testid="recipe-category">{ recpCat }</h4>
        <ul>
          {ings.map(({ ing, meas }, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              { `${ing} - ${meas}` }
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        { type === 'comida'
          ? (
            <object
              data-testid="video"
              aria-label="meal-video"
              width="400"
              height="300"
              data={ mealVideo }
            />)
          : '' }
        <div className="btn-container">
          <BtnShare />
        </div>
      </div>
    );
  };
  return (
    <div>
      { recipeInfo() }
      { renderRecomendations() }
      <BtnStartRecipe recipeId={ recipeId } type={ type } />
    </div>
  );
};

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
  match: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ])).isRequired,
};

export default RecipeDetails;
