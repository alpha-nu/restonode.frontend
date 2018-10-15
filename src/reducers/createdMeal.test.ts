import reducer from './createdMeal';
import { ICreatedMeal } from '../store';
import {
    NEW_MEAL_SUCCESS,
    NEW_MEAL_VALIDATION_ERROR,
    NEW_MEAL_REQUEST,
    NEW_MEAL_INIT
} from '../actions/meal';

test('updates new meal information in case of success', () => {
    const initialState: ICreatedMeal = {
        name: undefined,
        description: undefined
    };

    const state = reducer(initialState, {
        type: NEW_MEAL_SUCCESS,
        name: 'test',
        description: 'tasty'
    });

    expect(state.name).toEqual('test');
    expect(state.description).toEqual('tasty');
});

test('updates validation errors in case of failure', () => {
    const initialState: ICreatedMeal = {};

    const state = reducer(initialState, { type: NEW_MEAL_VALIDATION_ERROR, errors: { name: 'invalid' } });

    expect(state.validationErrors).toEqual({ name: 'invalid' });
});

test('returns initial state for unknown actions', () => {
    const initialState: ICreatedMeal = {};

    const state = reducer(initialState, { type: NEW_MEAL_REQUEST });

    expect(state).toBe(initialState);
});

test('resets created meal', () => {
    const initialState: ICreatedMeal = { name: 'meal', description: 'description', validationErrors: {} };

    const state = reducer(initialState, { type: NEW_MEAL_INIT });

    expect(state).toEqual({
        name: undefined,
        description: undefined,
        price: undefined,
        validationErrors: undefined
    });
});
