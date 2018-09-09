import { Firebase } from '../lib/firebase';
/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch) {
  const UID = auth().currentUser.uid;
  if (!UID) return false;

  const ref = Firebase.database().ref().child(`favourites/${UID}`);

  return ref.on('value', (snapshot) => {
    const favs = snapshot.val() || [];

    return dispatch({
      type: 'FAVOURITES_REPLACE',
      data: favs,
    });
  });
}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites) {
  const UID = auth().currentUser.uid;
  if (!UID) return false;

  return () => Firebase.database().ref().child(`favourites/${UID}`).set(newFavourites);
}

/**
  * Get Meals
  */
export function getMeals() {
  return dispatch => new Promise((resolve, reject) => Firebase.database().ref()
    .child('meals').once('value')
    .then((snapshot) => {
      const meals = snapshot.val() || {};

      return resolve(dispatch({
        type: 'MEALS_REPLACE',
        data: meals,
      }));
    }).catch(reject)).catch(e => console.log(e));
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}

/**
  * Get Recipes
  */
export function getRecipes() {
  return dispatch => new Promise(resolve => Firebase.database().ref().child('recipes')
    .on('value', (snapshot) => {
      const recipes = snapshot.val() || {};

      return resolve(dispatch({
        type: 'RECIPES_REPLACE',
        data: recipes,
      }));
    })).catch(e => console.log(e));
}
