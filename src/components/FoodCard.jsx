import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import getFood from '../services/SearchRecipe';
import { getFoodCard } from '../Redux/actions/index';

export default function FoodCard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const { cards, formInfo } = recipes;

  useEffect(() => {
    (async () => {
      const food = await getFood(formInfo, 'meals');
      dispatch(getFoodCard(food));
    })();
  }, [formInfo, dispatch]);

  const getCards = () => {
    if (cards) {
      return cards.map((item, index) => {
        const { idMeal, strMeal, strMealThumb, strCategory, strTags } = item;
        return (
          <Card key={ index } data-testid={ `${index}-recipe-card` }>
            <Card.Header>{strCategory}</Card.Header>
            <Card.Img
              variant="top"
              src={ strMealThumb }
              data-testid={ `${index}-card-img` }
            />
            <Card.Body>
              <Card.Title data-testid={ `${index}-card-name` }>{strMeal}</Card.Title>
              <Card.Text>{strTags}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button
                className="card-button"
                onClick={ () => history.push(`/comidas/${idMeal}`) }
                variant="primary"
              >
                Ver receita
              </Button>
            </Card.Footer>
          </Card>
        );
      });
    }
  };

  return <div className="food-cards">{getCards()}</div>;
}