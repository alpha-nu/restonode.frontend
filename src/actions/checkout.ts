import { IOrderConfirmation, ILogin } from '../store';
import { Dispatch } from 'redux';
import { RestonodeAction } from '.';
import axios from 'axios';
import { apiEndPoint } from '../config/endpoints';

export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_ERROR = 'ORDER_CHECKOUT_ERROR';
export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export type ORDER_CHECKOUT_STATUS =
    typeof ORDER_CHECKOUT_REQUEST
    | typeof ORDER_CHECKOUT_SUCCESS
    | typeof ORDER_CHECKOUT_ERROR;

export interface IOrderCheckout {
    type: ORDER_CHECKOUT_STATUS;
    response?: IOrderConfirmation;
}

export const checkout = ({ userName, orders }: ILogin) => {
    return async (dispatch: Dispatch<RestonodeAction>) => {
        dispatch({
            type: ORDER_CHECKOUT_REQUEST
        });

        try {

            const meals = orders.map(_ => ({ id: _.meal.id, quantity: _.quantity }));
            const result = await axios.post(`${apiEndPoint}/v1/order-management/orders`, {
                meals,
                userName
            });
            dispatch({
                type: ORDER_CHECKOUT_SUCCESS,
                response: result.data
            });
        } catch (e) {
            dispatch({ type: ORDER_CHECKOUT_ERROR });
        }
    };
};
