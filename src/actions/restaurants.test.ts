import {
    fetchRestaurants,
    FETCH_RESTAURANTS_ERROR,
    FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    selectRestaurant,
    SELECT_RESTAURANT
} from './restaurant';
import * as nock from 'nock';
import { apiEndPoint } from '../config/endpoints';
import { FETCH_MEALS_REQUEST, FETCH_MEALS_SUCCESS } from './meal';

beforeAll(() => {
    nock.disableNetConnect();
});

test('fetchRestaurants', async () => {
    nock(apiEndPoint).get('/v1/order-management/restaurants').reply(200,
        {
            restaurants: [
                {
                    name: 'great eats',
                    score: 8,
                    id: 1,
                    address: 'address'
                },
                {
                    name: 'fancy eats',
                    score: undefined,
                    id: 2,
                    address: 'address 2'
                }]
        }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();

    await fetchRestaurants()(dispatcher);

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: FETCH_RESTAURANTS_REQUEST
    });

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: FETCH_RESTAURANTS_SUCCESS,
        response: [
            { id: 1, name: 'great eats', address: 'address', rating: '8' },
            { id: 2, name: 'fancy eats', address: 'address 2', rating: 'n/a' }
        ]
    });
});

test('selectRestaurant', async () => {
    nock(apiEndPoint).get('/v1/order-management/restaurants/4/meals')
        .reply(200, { meals: [] }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();
    await selectRestaurant(4)(dispatcher);

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: SELECT_RESTAURANT,
        id: 4
    });

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: FETCH_MEALS_REQUEST,
        restaurantId: 4
    });

    expect(dispatcher.mock.calls[2][0]).toEqual({
        type: FETCH_MEALS_SUCCESS,
        response: []
    });
});

test('dispatches error action in case of fetch errors', async () => {
    nock(apiEndPoint).get('/v1/order-management/restaurants').reply(500, 'error');

    const dispatcher = jest.fn();
    await fetchRestaurants()(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({ type: FETCH_RESTAURANTS_ERROR });
});
