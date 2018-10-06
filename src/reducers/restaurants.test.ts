import { IRestaurant } from '../store';
import reducer from '../reducers/restaurants';
import { FETCH_RESTAURANTS_SUCCESS } from '../actions/restaurant';

test('returns initial state for unknown action types', () => {
    const initialState: IRestaurant[] = [];
    const result = reducer(initialState, { type: 'UNKNOWN' } as any);

    expect(result).toBe(initialState);
});

test('loads restaurants results into the store after successful fetch', () => {
    const response = [{ id: 1, name: 'name', address: 'address', rating: '10' }];
    const result = reducer([], { type: FETCH_RESTAURANTS_SUCCESS, response });

    expect(result).toEqual(response);
});
