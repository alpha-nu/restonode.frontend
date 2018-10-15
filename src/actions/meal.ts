import { IMeal } from '../store';
import { Dispatch } from 'redux';
import { RestonodeAction } from '.';
import axios from 'axios';
import { apiEndPoint } from '../config/endpoints';
import { mapValidationErrors } from './validation';

export const FETCH_MEALS_SUCCESS = 'FETCH_MEALS_SUCCESS';
export const FETCH_MEALS_ERROR = 'FETCH_MEALS_ERROR';
export const FETCH_MEALS_REQUEST = 'FETCH_MEALS_REQUEST';
export type FETCH_MEALS_STATUS =
    typeof FETCH_MEALS_REQUEST
    | typeof FETCH_MEALS_SUCCESS
    | typeof FETCH_MEALS_ERROR;

export interface IFetchMeals {
    type: FETCH_MEALS_STATUS;
    response?: IMeal[];
    restaurantId?: number;
}

export const ADD_MEAL_TO_ORDER = 'ADD_MEAL_TO_ORDER';
export type MODIFY_ORDER = typeof ADD_MEAL_TO_ORDER;
export interface IModifyOrder {
    type: MODIFY_ORDER;
    meal?: IMeal;
}

export const NEW_MEAL_REQUEST = 'NEW_MEAL_REQUEST';
export const NEW_MEAL_SUCCESS = 'NEW_MEAL_SUCCESS';
export const NEW_MEAL_ERROR = 'NEW_MEAL_ERROR';
export const NEW_MEAL_VALIDATION_ERROR = 'NEW_MEAL_VALIDATION_ERROR';
export type NEW_MEAL = typeof NEW_MEAL_REQUEST
    | typeof NEW_MEAL_SUCCESS
    | typeof NEW_MEAL_ERROR
    | typeof NEW_MEAL_VALIDATION_ERROR;
export interface INewMeal {
    type: NEW_MEAL;
    errors?: any;
    name?: string;
    description?: string;
}

export const fetchMeals = (restaurantId: number) => {
    return async (dispatch: Dispatch<RestonodeAction>) => {
        dispatch<IFetchMeals>({ type: FETCH_MEALS_REQUEST, restaurantId });

        try {
            const response = await axios.get(`${apiEndPoint}/v1/order-management/restaurants/${restaurantId}/meals`);
            dispatch<IFetchMeals>({ type: FETCH_MEALS_SUCCESS, response: response.data.meals });
        } catch (e) {
            dispatch({ type: FETCH_MEALS_ERROR });
        }
    };
};

export const addMeal = (meal: IMeal): IModifyOrder => ({
    type: ADD_MEAL_TO_ORDER,
    meal
});

export interface ICreateMealAttributes {
    name: string;
    description: string;
    price: number;
}

export const newMeal = (restaurantId: number, mealAttributes: ICreateMealAttributes) => {
    return async (dispatch: Dispatch<RestonodeAction>) => {
        dispatch({ type: NEW_MEAL_REQUEST });
        try {
            const result = await axios
                .post(`${apiEndPoint}/v1/order-management/restaurants/${restaurantId}/meals`, {
                    name: mealAttributes.name,
                    description: mealAttributes.description,
                    price: mealAttributes.price
                });

            const { name, description } = result.data.meal;
            dispatch({
                type: NEW_MEAL_SUCCESS,
                name,
                description
            });
        } catch (e) {
            if (e.response.status === 400) {
                dispatch({
                    type: NEW_MEAL_VALIDATION_ERROR,
                    errors: mapValidationErrors(e.response.data)
                });
            } else {

                dispatch({
                    type: NEW_MEAL_ERROR
                });
            }
        }
    };
};
