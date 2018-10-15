import { ICreatedMeal } from '../store';
import {
    INewMeal,
    NEW_MEAL_SUCCESS,
    NEW_MEAL_VALIDATION_ERROR,
    NEW_MEAL_INIT
} from '../actions/meal';

const initialState = {
    name: undefined,
    description: undefined,
    validationErrors: undefined
};

export default (state: ICreatedMeal = initialState, action: INewMeal) => {
    if (action.type === NEW_MEAL_SUCCESS) {
        return {
            name: action.name,
            description: action.description
        };
    }

    if (action.type === NEW_MEAL_VALIDATION_ERROR) {
        return {
            ...state,
            validationErrors: action.errors
        };
    }

    if (action.type === NEW_MEAL_INIT) {
        return {
            name: undefined,
            description: undefined,
            price: undefined,
            validationErrors: undefined
        };
    }

    return state;
};
