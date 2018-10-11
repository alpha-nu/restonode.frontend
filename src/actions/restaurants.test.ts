import { fetchRestaurants, FETCH_RESTAURANTS_ERROR } from './restaurant';

test('dispatches error action in case of fetch errors', async () => {
    const dispatcher = jest.fn();
    await fetchRestaurants()(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({ type: FETCH_RESTAURANTS_ERROR });
});
