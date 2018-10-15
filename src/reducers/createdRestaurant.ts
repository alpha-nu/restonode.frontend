import { ICreatedRestaurant } from '../store';
import {
    INewRestaurant,
    NEW_RESTAURANT_SUCCESS,
    NEW_RESTAURANT_VALIDATION_ERROR,
    NEW_RESTAURANT_INIT
} from '../actions/restaurant';

const initialState = {
    name: undefined,
    validationErrors: undefined
};

export default (state: ICreatedRestaurant = initialState, action: INewRestaurant) => {
    if (action.type === NEW_RESTAURANT_SUCCESS) {
        return {
            name: action.name
        };
    }

    if (action.type === NEW_RESTAURANT_VALIDATION_ERROR) {
        return {
            ...state,
            validationErrors: action.errors
        };
    }

    if (action.type === NEW_RESTAURANT_INIT) {
        return {
            name: undefined,
            validationErrors: undefined
        };
    }

    return state;
};
