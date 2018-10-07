import { IMeal } from '../store';

// import axios from 'axios';
// import { apiEndPoint } from '../config/endpoints';

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
}
