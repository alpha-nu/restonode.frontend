import { IMeal } from '../store';
import { Dispatch } from 'redux';
import { RestonodeAction } from '.';
import axios from 'axios';
import { apiEndPoint } from '../config/endpoints';

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
