import {
    fetchRestaurants,
    FETCH_RESTAURANTS_ERROR,
    FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    selectRestaurant,
    SELECT_RESTAURANT,
    newRestaurant,
    NEW_RESTAURANT_REQUEST,
    NEW_RESTAURANT_SUCCESS,
    NEW_RESTAURANT_ERROR,
    NEW_RESTAURANT_VALIDATION_ERROR
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
                    score: 8.4778,
                    id: 1,
                    address: 'address'
                },
                {
                    name: 'fancy eats',
                    score: undefined,
                    id: 2,
                    address: 'address 2'
                },
                {
                    name: 'imaginary eats',
                    score: 6,
                    id: 3,
                    address: 'address 3'
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
            { id: 1, name: 'great eats', address: 'address', rating: '8.5' },
            { id: 2, name: 'fancy eats', address: 'address 2', rating: 'n/a' },
            { id: 3, name: 'imaginary eats', address: 'address 3', rating: '6' }
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

test('newRestaurant', async () => {
    nock(apiEndPoint).post('/v1/order-management/restaurants', {
        name: 'awesome eats',
        address: 'address',
        email: 'awesome.eats@email.com',
        owner: 'mrBigShot'
    }).reply(201, {
        name: 'saved_name',
        score: undefined,
        id: 0,
        address: 'saved_address'
    }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();
    await newRestaurant({
        name: 'awesome eats',
        address: 'address',
        email: 'awesome.eats@email.com',
        owner: 'mrBigShot'
    })(dispatcher);

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: NEW_RESTAURANT_REQUEST
    });

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: NEW_RESTAURANT_SUCCESS,
        name: 'saved_name'
    });
});

test('dispatches validation error action in case of bad requests', async () => {
    nock(apiEndPoint).post('/v1/order-management/restaurants').reply(400, {
        code: 400,
        message: [
            {
                property: 'name',
                children: [],
                constraints: {
                    isNotEmpty: 'is required'
                }
            }, {
                property: 'email',
                children: [],
                constraints: {
                    isEmail: 'must be a valid email'
                }
            }, {
                property: 'address',
                children: [
                    {
                        property: 'normalized',
                        children: [],
                        constraints: {
                            isNotEmpty: 'is required'
                        }
                    }]
            }]
    }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();
    await newRestaurant({
        name: '',
        address: '',
        email: '',
        owner: ''
    })(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: NEW_RESTAURANT_VALIDATION_ERROR,
        errors: {
            address: 'is required',
            email: 'must be a valid email',
            name: 'is required'
        }
    });
});

test('dispatches generic error action for non 400 bad request response', async () => {
    nock(apiEndPoint).post('/v1/order-management/restaurants').reply(401, {
        code: 401,
        message: 'unauthorized'
    }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();
    await newRestaurant({
        address: '',
        email: '',
        name: '',
        owner: 'unauthorized'
    })(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: NEW_RESTAURANT_ERROR
    });
});
