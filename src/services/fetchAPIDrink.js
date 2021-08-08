// const urlIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente}';
const urlName = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=';
const urlCategoryFilter = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
// const urlFirstLetter = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f={primeira-letra}';
const urlId = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const drinkRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export async function fetchAPIName(name) {
  try {
    const response = await fetch(`${urlName}${name}`);
    const resolve = await response.json();
    return resolve.drinks;
  } catch (error) {
    return console.log(error);
  }
}

export async function fetchAPICategory(category) {
  try {
    const response = await fetch(`${urlCategory}${category}`);
    const resolve = await response.json();
    return resolve.drinks;
  } catch (error) {
    return console.log(error);
  }
}

export async function fetchAPICategoryFilter(category) {
  try {
    const response = await fetch(`${urlCategoryFilter}${category}`);
    const resolve = await response.json();
    return resolve.drinks;
  } catch (error) {
    return console.log(error);
  }
}

export async function fetchAPIByID(id) {
  try {
    const response = await fetch(`${urlId}${id}`);
    const resolve = await response.json();
    return resolve.drinks;
  } catch (error) {
    return console.log(error);
  }
}

export async function fetchDrinkRandom() {
  try {
    const response = await fetch(`${drinkRandom}`);
    const resolve = await response.json();
    return resolve.drinks[0].idDrink;
  } catch (error) {
    return console.log(error);
  }
}
