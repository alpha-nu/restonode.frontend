import hasError from './hasError';
import { FETCH_MEALS_ERROR } from '../actions/meal';
import { FETCH_RESTAURANTS_ERROR, FETCH_RESTAURANTS_REQUEST, NEW_RESTAURANT_ERROR } from '../actions/restaurant';
import { ORDER_CHECKOUT_ERROR } from '../actions/checkout';

test('sets hasError to true in case of fetch errors', () => {
    expect(hasError(undefined, { type: FETCH_MEALS_ERROR })).toBe(true);
    expect(hasError(undefined, { type: FETCH_RESTAURANTS_ERROR })).toBe(true);
    expect(hasError(undefined, { type: ORDER_CHECKOUT_ERROR })).toBe(true);
    expect(hasError(undefined, { type: NEW_RESTAURANT_ERROR })).toBe(true);
});

test('returns initial state for unknown action type', () => {
    expect(hasError(true, { type: FETCH_RESTAURANTS_REQUEST })).toBe(false);
});
