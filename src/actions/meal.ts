import { IMeal } from '../store';
import { Dispatch } from 'redux';
import { RestonodeAction } from '.';
import axios from 'axios';
import { apiEndPoint } from '../config/endpoints';
const FETCH_MEALS = 'FETCH_MEALS';
export type FETCH_MEALS = typeof FETCH_MEALS;

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

export const fetchMeals = (restaurantId: number) => {
    return async (dispatch: Dispatch<RestonodeAction>) => {
        dispatch<IFetchMeals>({ type: FETCH_MEALS_REQUEST, restaurantId });

        const response = await axios.get(`${apiEndPoint}/v1/order-management/restaurants/${restaurantId}/meals`);
        dispatch<IFetchMeals>({type: FETCH_MEALS_SUCCESS, response: response.data.meals});
    };
};
