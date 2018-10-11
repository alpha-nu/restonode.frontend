import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App, { mapStateToProps, mapDispatchToProps } from './app';
import { IStoreState, ILogin } from '../store';
import { SWITCH_LOGIN } from '../actions/login';
import { FETCH_RESTAURANTS_REQUEST, FETCH_RESTAURANTS_SUCCESS, SELECT_RESTAURANT } from '../actions/restaurant';
import * as nock from 'nock';
import { apiEndPoint } from '../config/endpoints';
import { FETCH_MEALS_REQUEST, FETCH_MEALS_SUCCESS, ADD_MEAL_TO_ORDER } from '../actions/meal';
import { ORDER_CHECKOUT_REQUEST, ORDER_CHECKOUT_SUCCESS } from '../actions/checkout';

const mockStore = configureMockStore();

enzyme.configure({ adapter: new Adapter() });

beforeAll(() => {
    nock.disableNetConnect();
});

beforeEach(nock.cleanAll);

test('App container is connected to the store', () => {
    const store = mockStore();
    const app = shallow(
        <Provider store={store}>
            <App />
        </Provider>
    );
    expect(app.find('Connect(App)').length).toBe(1);
});

test('map logins state to props', () => {
    const initialState: IStoreState = {
        restaurants: { all: [] },
        user: {
            logins: [],
            current: {
                userName: 'test',
                canCreateRestaurant: false,
                orders: []
            }
        }
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.user).toEqual(initialState.user);
});

test('map restaurants to props', () => {
    const initialState: IStoreState = {
        user: { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } },
        restaurants: { all: [{ name: 'test', address: 'address', rating: '7', id: 1 }] }
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.restaurants.all).toEqual([{
        name: 'test',
        address: 'address',
        rating: '7',
        id: 1
    }]);
});

test('map switchLogin to store dispatch', () => {
    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    mappedDispatches.switchLogin('test');

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: SWITCH_LOGIN,
        userName: 'test'
    });
});

test('map fetchRestaurants to store dispatch', async () => {

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
    const mappedDispatches = mapDispatchToProps(dispatcher);

    await mappedDispatches.fetchRestaurants();

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

test('map selectRestaurant to store dispatch', () => {
    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    mappedDispatches.selectRestaurant(4);

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: SELECT_RESTAURANT,
        id: 4
    });
});

test('map fetchMeals to store dispatch', async () => {
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
    const mappedDispatches = mapDispatchToProps(dispatcher);

    await mappedDispatches.fetchMeals(1);

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

test('map add meal to store dispatch', () => {
    const dispatcher = jest.fn();

    const mappedDispatches = mapDispatchToProps(dispatcher);

    mappedDispatches.addMeal({
        id: 1,
        name: 'meal',
        description: 'fatty',
        price: 40
    });

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: ADD_MEAL_TO_ORDER,
        meal: {
            id: 1,
            name: 'meal',
            description: 'fatty',
            price: 40
        }
    });
});

test('map checkout to dispatches', async () => {
    nock(apiEndPoint).post('/v1/order-management/orders',
        {
            meals: [{ id: 1, quantity: 2 }],
            userName: 'user'
        }).reply(201, {
            deliveries: []
        }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);
    const user: ILogin = {
        canCreateRestaurant: false, userName: 'user', orders: [
            { quantity: 2, meal: { id: 1, name: 'meal', description: '', price: 100 }, total: 100 }
        ]
    };

    await mappedDispatches.checkout(user);

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: ORDER_CHECKOUT_REQUEST
    });

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: ORDER_CHECKOUT_SUCCESS,
        response: { deliveries: [] }
    });
});

test('maps isFetching to props', () => {
    const initialState: IStoreState = {
        user: { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } },
        restaurants: { all: [] },
        isFetching: true
    };
    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.isFetching).toBe(true);
});
