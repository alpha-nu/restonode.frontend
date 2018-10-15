import reducer from './createdRestaurant';
import { ICreatedRestaurant } from '../store';
import {
    NEW_RESTAURANT_SUCCESS,
    NEW_RESTAURANT_VALIDATION_ERROR,
    NEW_RESTAURANT_REQUEST,
    NEW_RESTAURANT_INIT
} from '../actions/restaurant';

test('updates new restaurant name in case of success', () => {
    const initialState: ICreatedRestaurant = {
        name: ''
    };

    const state = reducer(initialState, { type: NEW_RESTAURANT_SUCCESS, name: 'test' });

    expect(state.name).toEqual('test');
});

test('updates validation errors in case of failure', () => {
    const initialState: ICreatedRestaurant = {};

    const state = reducer(initialState, { type: NEW_RESTAURANT_VALIDATION_ERROR, errors: { name: 'invalid' } });

    expect(state.validationErrors).toEqual({ name: 'invalid' });
});

test('returns initial state for unknown actions', () => {
    const initialState: ICreatedRestaurant = {
        name: 'test'
    };

    const state = reducer(initialState, { type: NEW_RESTAURANT_REQUEST });

    expect(state).toBe(initialState);
});

test('resets created restaurant', () => {
    const initialState: ICreatedRestaurant = {
        name: 'test',
        validationErrors: {}
    };

    const state = reducer(initialState, { type: NEW_RESTAURANT_INIT });

    expect(state).toEqual({
        name: undefined,
        validationErrors: undefined
    });
});
