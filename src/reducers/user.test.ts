import reducer from './user';
import { SWITCH_LOGIN } from '../actions/login';
import { IUser } from '../store';
import { ADD_MEAL_TO_ORDER } from '../actions/meal';
import { ORDER_CHECKOUT_SUCCESS } from '../actions/checkout';

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

test('adds a meal to an empty user order', () => {
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

test('adds a meal to a user order', () => {
    const state: IUser = {
        logins: [],
        current: {
            userName: 'hungryJoe',
            canCreateRestaurant: false,
            orders: [{
                meal: {
                    id: 2,
                    description: 'dessert',
                    name: 'pie',
                    price: 40
                },
                quantity: 1,
                total: 40
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
                id: 2,
                description: 'dessert',
                name: 'pie',
                price: 40
            },
            quantity: 1,
            total: 40
        },
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
            },
            {
                meal: {
                    id: 2,
                    description: 'yummy',
                    name: 'pie',
                    price: 20
                },
                quantity: 2,
                total: 40
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
        },
        {
            meal: {
                id: 2,
                description: 'yummy',
                name: 'pie',
                price: 20
            },
            quantity: 2,
            total: 40
        }
    ]);
});

test('on successful checkout populates confirmation order and clears out orders', () => {
    const state: IUser = {
        logins: [],
        current: {
            canCreateRestaurant: false, userName: 'test', orders: [
                { meal: { id: 1, name: '', description: '', price: 0 }, quantity: 1, total: 0 }
            ]
        }
    };

    const order = {
        deliveries: [
            {
                meals: [{ quantity: 1, name: '' }],
                eta: '',
                restaurant: {name: '', email: ''},
                subTotal: 0
            }
        ],
        customer: {
            userName: '',
            address: '',
            phone: ''
        },
        grandTotal: 0
    };

    const user = reducer(state, {
        type: ORDER_CHECKOUT_SUCCESS,
        response: order
    });

    expect(user.current.confirmation).toEqual(order);
    expect(user.current.orders).toEqual([]);
});
