import {
    fetchMeals,
    FETCH_MEALS_ERROR,
    FETCH_MEALS_REQUEST,
    FETCH_MEALS_SUCCESS,
    addMeal,
    ADD_MEAL_TO_ORDER,
    newMeal,
    NEW_MEAL_REQUEST,
    NEW_MEAL_SUCCESS,
    NEW_MEAL_ERROR,
    NEW_MEAL_VALIDATION_ERROR
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

test('newMeal', async () => {
    nock(apiEndPoint).post('/v1/order-management/restaurants/1/meals', {
        name: 'meal',
        description: 'tasty',
        price: 100
    }).reply(201, {
        meal: {
            id: 1,
            name: 'meal',
            description: 'tasty',
            price: 100
        }
    }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();
    await newMeal(1, { name: 'meal', description: 'tasty', price: 100 })(dispatcher);

    expect(dispatcher.mock.calls[0][0]).toEqual({ type: NEW_MEAL_REQUEST });
    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: NEW_MEAL_SUCCESS,
        name: 'meal',
        description: 'tasty'
    });
});

test('dispatches generic error for non 400 bad requests', async () => {
    nock(apiEndPoint).post('/v1/order-management/restaurants/1/meals', {
        name: '',
        description: '',
        price: 0
    }).reply(500, {}, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();
    await newMeal(1, { price: 0, name: '', description: '' })(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: NEW_MEAL_ERROR
    });
});

test('dispatches validation errors in case of bad requests', async () => {
    nock(apiEndPoint).post('/v1/order-management/restaurants/1/meals', {
        name: '',
        description: '',
        price: 0
    }).reply(400, {
        code: 400,
        message: [
            {
                property: 'name',
                children: [],
                constraints: {
                    isNotEmpty: 'is required'
                }
            },
            {
                property: 'description',
                children: [],
                constraints: {
                    isNotEmpty: 'is required'
                }
            },
            {
                property: 'price',
                children: [],
                constraints: {
                    isNotEmpty: 'is required',
                    isNumber: 'must be a number'
                }
            }
        ]
    }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();
    await newMeal(1, { price: 0, name: '', description: '' })(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: NEW_MEAL_VALIDATION_ERROR,
        errors: {
            name: 'is required',
            description: 'is required',
            price: 'is required, must be a number'
        }
    });
});
