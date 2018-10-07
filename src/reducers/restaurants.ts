import { IRestaurants } from '../store';
import { RestonodeAction } from '../actions';
import { FETCH_RESTAURANTS_SUCCESS } from '../actions/restaurant';
import { SELECT_RESTAURANT } from '../actions/restaurant';
import { FETCH_MEALS_SUCCESS } from '../actions/meal';

const initialState: IRestaurants = {
    all: []
};

export default (restaurants: IRestaurants = initialState, action: RestonodeAction): IRestaurants => {
    if (action.type === FETCH_RESTAURANTS_SUCCESS) {
        return { ...restaurants, all: action.response! };
    }

    if (action.type === SELECT_RESTAURANT) {
        return { ...restaurants, selected: { ...restaurants.all.find(_ => _.id === action.id)! } };
    }

    if (action.type === FETCH_MEALS_SUCCESS) {
        return { ...restaurants, selected: { ...restaurants.selected!, meals: action.response } };
    }

    return restaurants;
};
