import { IRestaurant } from '../store';
import { Dispatch } from 'redux';
import { RestonodeAction } from '.';
import axios from 'axios';
import { apiEndPoint } from '../config/endpoints';
import { fetchMeals } from './meal';

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

export const SELECT_RESTAURANT = 'SELECT_RESTAURANT';
export type SELECT_RESTAURANT = typeof SELECT_RESTAURANT;
export interface ISelectRestaurant {
    type: SELECT_RESTAURANT;
    id: number;
}

export const NEW_RESTAURANT_REQUEST = 'NEW_RESTAURANT_REQUEST';
export const NEW_RESTAURANT_SUCCESS = 'NEW_RESTAURANT_SUCCESS';
export const NEW_RESTAURANT_ERROR = 'NEW_RESTAURANT_ERROR';
export const NEW_RESTAURANT_VALIDATION_ERROR = 'NEW_RESTAURANT_VALIDATION_ERROR';
export type NEW_RESTAURANT = typeof NEW_RESTAURANT_REQUEST
    | typeof NEW_RESTAURANT_SUCCESS
    | typeof NEW_RESTAURANT_ERROR
    | typeof NEW_RESTAURANT_VALIDATION_ERROR;
export interface INewRestaurant {
    type: NEW_RESTAURANT;
    errors?: any;
    name?: string;
}

const formatRating = (score?: number) => {
    if (!score) { return 'n/a'; }
    return score.toFixed(1).toString();
};

export const fetchRestaurants = () => {
    return async (dispatch: Dispatch<RestonodeAction>) => {
        dispatch<IFetchRestaurants>({ type: FETCH_RESTAURANTS_REQUEST });

        try {
            const response = await axios.get(`${apiEndPoint}/v1/order-management/restaurants`);
            const result = response.data.restaurants.map(
                ({ id, name, address, score }: any) => ({
                    id,
                    name,
                    address,
                    rating: formatRating(score)
                } as any));

            dispatch<IFetchRestaurants>({ type: FETCH_RESTAURANTS_SUCCESS, response: result });
        } catch (e) {
            dispatch<IFetchRestaurants>({ type: FETCH_RESTAURANTS_ERROR });
        }
    };
};

export const selectRestaurant = (id: number) => {
    return async (dispatch: Dispatch<RestonodeAction>) => {
        dispatch<ISelectRestaurant>({
            type: SELECT_RESTAURANT,
            id
        });

        await fetchMeals(id)(dispatch);
    };
};

export interface ICreateRestaurantAttributes {
    owner: string;
    address: string;
    email: string;
    name: string;
}

export const newRestaurant = (restaurant: ICreateRestaurantAttributes) => {
    return async (dispatch: Dispatch<RestonodeAction>) => {
        const { owner, name, address, email } = restaurant;
        dispatch({
            type: NEW_RESTAURANT_REQUEST
        });

        try {
            const response = await axios.post(`${apiEndPoint}/v1/order-management/restaurants`,
                {
                    owner,
                    name,
                    email,
                    address
                });

            const result = response.data;
            dispatch({
                type: NEW_RESTAURANT_SUCCESS,
                name: result.name
            });

        } catch (e) {
            if (e.response.status === 400) {
                dispatch({
                    type: NEW_RESTAURANT_VALIDATION_ERROR,
                    errors: mapErrors(e.response.data)
                });
            } else {
                dispatch({
                    type: NEW_RESTAURANT_ERROR
                });
            }
        }
    };
};

const mapErrors = (error: any) => {
    const recurseErrors = (err: any): any => {
        if (err.children.length === 0) {
            const constraints = err.constraints;
            return Object.keys(constraints).map(_ => constraints[_]).join(', ');
        }

        for (const child of err.children) {
            return recurseErrors(child);
        }
    };

    return error.message.reduce((acc: any, _: any) => {
        acc[_.property] = recurseErrors(_);
        return acc;
    }, {});
};
