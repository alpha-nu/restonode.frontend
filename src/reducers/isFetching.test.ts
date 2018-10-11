import isFetching from './isFetching';
import { FETCH_MEALS_REQUEST, FETCH_MEALS_SUCCESS, FETCH_MEALS_ERROR } from '../actions/meal';
import { FETCH_RESTAURANTS_REQUEST, FETCH_RESTAURANTS_SUCCESS, FETCH_RESTAURANTS_ERROR } from '../actions/restaurant';
import { ORDER_CHECKOUT_REQUEST, ORDER_CHECKOUT_SUCCESS, ORDER_CHECKOUT_ERROR } from '../actions/checkout';

test('sets is Fetching to true when a request is made', () => {
    expect(isFetching(undefined, { type: FETCH_MEALS_REQUEST })).toBe(true);
    expect(isFetching(undefined, { type: FETCH_RESTAURANTS_REQUEST })).toBe(true);
    expect(isFetching(undefined, { type: ORDER_CHECKOUT_REQUEST })).toBe(true);
});

test('sets isFetching to false in case of success', () => {
    expect(isFetching(undefined, { type: FETCH_MEALS_SUCCESS })).toBe(false);
    expect(isFetching(undefined, { type: FETCH_RESTAURANTS_SUCCESS })).toBe(false);
    expect(isFetching(undefined, { type: ORDER_CHECKOUT_SUCCESS })).toBe(false);
});

test('sets isFetching to false in case of fetch errors', () => {
    expect(isFetching(undefined, { type: FETCH_MEALS_ERROR })).toBe(false);
    expect(isFetching(undefined, { type: FETCH_RESTAURANTS_ERROR })).toBe(false);
    expect(isFetching(undefined, { type: ORDER_CHECKOUT_ERROR })).toBe(false);
});