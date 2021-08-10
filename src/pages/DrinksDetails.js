import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import DetailsDrinkHeader from '../components/details/detailsDrink/DetailsDrinkHeader';
import DetailsShareDrinks from '../components/details/detailsDrink/DetailsShareDrinks';
import
DetailsDrinkFavoriteButton
  from '../components/details/detailsDrink/DetailsDrinkFavoriteButton';
import
DetailsDrinkIngredientList
  from '../components/details/detailsDrink/DetailsDrinkIngredientList';

import '../styles/components/footer.css';

import RecipesContext from '../context/RecipesContext';
import ButtonStartMeal from '../components/details/ButtonStartMeal';

function DrinksDetails() {
  const {
    drinkId,
    getDrinkId,
    mealsRecommend,
  } = useContext(RecipesContext);

  const maximum = 6;

  const { id } = useParams();

  useEffect(() => {
    getDrinkId(id);
  }, [getDrinkId, id]);

  return (
    <div>
      { (drinkId.idDrink === id) ? (
        <div>
          <DetailsDrinkHeader />
          <div>
            <DetailsShareDrinks />
            <DetailsDrinkFavoriteButton id={ id } />
          </div>
          <div>
            <DetailsDrinkIngredientList />
            <div>
              <h4>Instruction</h4>
              <p data-testid="instructions">{ drinkId.strInstructions }</p>
            </div>
          </div>
          <div>
            <h4>recomendações</h4>
            <Carousel
              width="100%"
              height="200px"
            >
              {
                mealsRecommend.slice(0, maximum).map((meal, index) => (
                  <Carousel.Item
                    key={ index }
                    data-testid={ `${index}-recomendation-card` }
                  >
                    <img
                      alt="Recomendation"
                      src={ meal.strMealThumb }
                    />
                    <Carousel.Caption>
                      <p data-testid={ `${index}-recomendation-title` }>
                        {meal.strMeal}
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))
              }
            </Carousel>
            {/* <span data-testid="0-recomendation-card">recomendações test</span>
            <span data-testid="0-recomendation-title">titulo recomendações</span> */}
          </div>
          <div>
            <div>
              <ButtonStartMeal id={ id } type="cocktails" />
            </div>
          </div>
        </div>
      ) : 'Carregando...' }
    </div>
  );
}

export default DrinksDetails;