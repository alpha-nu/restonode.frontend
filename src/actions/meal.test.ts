import {
    fetchMeals,
    FETCH_MEALS_ERROR,
    FETCH_MEALS_REQUEST,
    FETCH_MEALS_SUCCESS,
    addMeal,
    ADD_MEAL_TO_ORDER
} from './meal';
import * as nock from 'nock';
import { apiEndPoint } from '../config/endpoints';

beforeAll(() => {
    nock.disableNetConnect();
});

test('fetchMeals', async () => {
    nock(apiEndPoint).get('/v1/order-management/restaurants/1/meals').reply(200,
        {
            meals: [
                {
                    id: 1,
                    name: 'house burger',
                    description: 'address',
                    price: 8
                }]
        }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();

    await fetchMeals(1)(dispatcher);

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: FETCH_MEALS_REQUEST,
        restaurantId: 1
    });

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: FETCH_MEALS_SUCCESS,
        response: [
            {
                id: 1,
                name: 'house burger',
                description: 'address',
                price: 8
            }]
    });
});

test('addMeal', () => {

    const action = addMeal({
        id: 1,
        name: 'meal',
        description: 'fatty',
        price: 40
    });

    expect(action).toEqual({
        type: ADD_MEAL_TO_ORDER,
        meal: {
            id: 1,
            name: 'meal',
            description: 'fatty',
            price: 40
        }
    });
});

test('dispatches error action in case of fetch errors', async () => {
    nock(apiEndPoint)
        .get('/v1/order-management/restaurants/500/meals')
        .reply(500, 'error');

    const dispatcher = jest.fn();
    await fetchMeals(500)(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({ type: FETCH_MEALS_ERROR });
});
