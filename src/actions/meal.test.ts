import { fetchMeals, FETCH_MEALS_ERROR } from './meal';

test('dispatches error action in case of fetch errors', async () => {
    const dispatcher = jest.fn();
    await fetchMeals(1)(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({ type: FETCH_MEALS_ERROR });
});
