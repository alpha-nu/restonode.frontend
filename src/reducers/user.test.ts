import reducer from './user';
import { SWITCH_LOGIN } from '../actions/login';
import { IUser } from '../store';
import { ADD_MEAL_TO_ORDER } from '../actions/meal';

test('sets loggedIn flag to true when user is switched and resets the rest', () => {
    const initialLogins: IUser = {
        logins: [
            { userName: 'anonymous', canCreateRestaurant: false, orders: [] },
            { userName: 'hungryJoe', canCreateRestaurant: false, orders: [] },
            { userName: 'mrBigShot', canCreateRestaurant: true, orders: [] }
        ],
        current: { userName: 'mrBigShot', canCreateRestaurant: true, orders: [] }
    };

    const logins = reducer(initialLogins, { type: SWITCH_LOGIN, userName: 'hungryJoe' });
    expect(logins.current).toEqual({ userName: 'hungryJoe', canCreateRestaurant: false, orders: [] });
});

test('return initial state for unknown action types', () => {
    const initialState: any = [];
    const logins = reducer(initialState, { type: 'UNKNOWN', userName: 'hungryJoe' } as any);
    expect(logins).toBe(initialState);
});

test('adds a meal to a user order', () => {
    const state: IUser = {
        logins: [],
        current: {
            userName: 'hungryJoe',
            canCreateRestaurant: false,
            orders: []
        }
    };

    const user: IUser = reducer(state, {
        type: ADD_MEAL_TO_ORDER, meal: {
            id: 1,
            description: 'tasty',
            name: 'burger',
            price: 120
        }
    });

    expect(user.current.orders).toEqual([
        {
            meal: {
                id: 1,
                description: 'tasty',
                name: 'burger',
                price: 120
            },
            quantity: 1,
            total: 120
        }
    ]);
});

test('increments the quantity if a meal already exists in the order', () => {
    const state: IUser = {
        logins: [],
        current: {
            userName: 'hungryJoe',
            canCreateRestaurant: false,
            orders: [{
                meal: {
                    id: 1,
                    description: 'tasty',
                    name: 'burger',
                    price: 120
                },
                quantity: 1,
                total: 120
            }]
        }
    };

    const user: IUser = reducer(state, {
        type: ADD_MEAL_TO_ORDER, meal: {
            id: 1,
            description: 'tasty',
            name: 'burger',
            price: 120
        }
    });

    expect(user.current.orders).toEqual([
        {
            meal: {
                id: 1,
                description: 'tasty',
                name: 'burger',
                price: 120
            },
            quantity: 2,
            total: 240
        }
    ]);
});
