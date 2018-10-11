import hasError from './hasError';
import { FETCH_MEALS_ERROR } from '../actions/meal';
import { FETCH_RESTAURANTS_ERROR } from '../actions/restaurant';
import { ORDER_CHECKOUT_ERROR } from '../actions/checkout';

test('sets hasError to true in case of fetch errors', () => {
    expect(hasError(undefined, { type: FETCH_MEALS_ERROR })).toBe(true);
    expect(hasError(undefined, { type: FETCH_RESTAURANTS_ERROR })).toBe(true);
    expect(hasError(undefined, { type: ORDER_CHECKOUT_ERROR })).toBe(true);
});
