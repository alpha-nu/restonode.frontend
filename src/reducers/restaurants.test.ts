import { IRestaurants } from '../store';
import reducer from '../reducers/restaurants';
import { FETCH_RESTAURANTS_SUCCESS, SELECT_RESTAURANT } from '../actions/restaurant';
import { FETCH_MEALS_SUCCESS } from '../actions/meal';

test('returns initial state for unknown action types', () => {
    const initialState: IRestaurants = { all: [] };
    const result = reducer(initialState, { type: 'UNKNOWN' } as any);

    expect(result).toBe(initialState);
});

test('loads restaurants results into the store after successful fetch', () => {
    const response = [{ id: 1, name: 'name', address: 'address', rating: '10' }];
    const result = reducer({ all: [] }, { type: FETCH_RESTAURANTS_SUCCESS, response });

    expect(result.all).toEqual(response);
});

test('udpates store with the selected restaurant', () => {
    const initialState: IRestaurants = {
        all: [
            { id: 1, address: 'address', rating: '7', name: 'resto1' },
            { id: 5, address: 'address', rating: '6', name: 'resto2' }
        ], selected: undefined
    };

    const result = reducer(initialState, { type: SELECT_RESTAURANT, id: 5 });

    expect(result).toEqual({
        ...initialState,
        selected: { id: 5, address: 'address', rating: '6', name: 'resto2' }
    });
});

test('updates selected restaurant with fetched meals', () => {
    const initialState: IRestaurants = {
        all: [], selected: { id: 1, address: 'address', rating: '7', name: 'resto1' }
    };

    const result = reducer(initialState, {
        type: FETCH_MEALS_SUCCESS, response: [
            {
                id: 1,
                name: 'meal',
                description: 'yummy',
                price: 80
            }
        ]
    });

    expect(result).toEqual({
        all: [], selected: {
            id: 1,
            address: 'address',
            rating: '7',
            name: 'resto1',
            meals: [{
                id: 1,
                name: 'meal',
                description: 'yummy',
                price: 80
            }]
        }
    });
});
