import { ICreatedMeal } from '../store';
import {
    INewMEAL,
    NEW_MEAL_SUCCESS,
    NEW_MEAL_VALIDATION_ERROR
} from '../actions/meal';

const initialState = {
    name: undefined,
    description: undefined,
    validationErrors: undefined
};

export default (state: ICreatedMeal = initialState, action: INewMEAL) => {
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

    return state;
};
