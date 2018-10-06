import { IRestaurant } from '../store';
import { Dispatch } from 'redux';
import { RestonodeAction } from '.';
import axios from 'axios';
import { apiEndPoint } from '../config/endpoints';

const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export type FETCH_RESTAURANTS = typeof FETCH_RESTAURANTS;

export const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
export const FETCH_RESTAURANTS_ERROR = 'FETCH_RESTAURANTS_ERROR';
export const FETCH_RESTAURANTS_REQUEST = 'FETCH_RESTAURANTS_REQUEST';
export type FETCH_RESTAURANTS_STATUS =
    typeof FETCH_RESTAURANTS_REQUEST
    | typeof FETCH_RESTAURANTS_SUCCESS
    | typeof FETCH_RESTAURANTS_ERROR;

export interface IFetchRestaurants {
    type: FETCH_RESTAURANTS_STATUS;
    response?: IRestaurant[];
}

export const fetchRestaurants = () => {
    return async (dispatch: Dispatch<RestonodeAction>) => {
        dispatch<IFetchRestaurants>({ type: FETCH_RESTAURANTS_REQUEST });

        const response = await axios.get(`${apiEndPoint}/v1/order-management/restaurants`);
        const result = response.data.restaurants.map(
            ({ id, name, address, score }: any) => ({
                id,
                name,
                address,
                rating: score && score.toString() || 'n/a'
            } as any));

        dispatch<IFetchRestaurants>({ type: FETCH_RESTAURANTS_SUCCESS, response: result });
    };
};
