import { checkout, ORDER_CHECKOUT_ERROR, ORDER_CHECKOUT_REQUEST, ORDER_CHECKOUT_SUCCESS } from './checkout';
import { ILogin } from '../store';
import { apiEndPoint } from '../config/endpoints';
import * as nock from 'nock';

test('checkout', async () => {
    nock(apiEndPoint).post('/v1/order-management/orders',
        {
            meals: [{ id: 1, quantity: 2 }],
            userName: 'user'
        }).reply(201, {
            deliveries: []
        }, { 'Access-Control-Allow-Origin': '*' });

    const user: ILogin = {
        canCreateRestaurant: false, userName: 'user', orders: [
            { quantity: 2, meal: { id: 1, name: 'meal', description: '', price: 100 }, total: 100 }
        ]
    };

    const dispatcher = jest.fn();
    await checkout(user)(dispatcher);

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: ORDER_CHECKOUT_REQUEST
    });

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: ORDER_CHECKOUT_SUCCESS,
        response: { deliveries: [] }
    });
});

test('dispatches error action in case of fetch errors', async () => {
    const orders: ILogin = { userName: '', orders: [], canCreateRestaurant: false };
    const dispatcher = jest.fn();
    await checkout(orders)(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({ type: ORDER_CHECKOUT_ERROR });
});
