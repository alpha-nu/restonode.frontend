import { fetchMeals, FETCH_MEALS_ERROR } from './meal';
import * as nock from 'nock';
import { apiEndPoint } from '../config/endpoints';

beforeAll(() => {
    nock.disableNetConnect();
});

test('dispatches error action in case of fetch errors', async () => {
    nock(apiEndPoint)
        .get('/v1/order-management/restaurants/500/meals')
        .reply(500, 'error');

    const dispatcher = jest.fn();
    await fetchMeals(500)(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({ type: FETCH_MEALS_ERROR });
});
