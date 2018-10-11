import { fetchRestaurants, FETCH_RESTAURANTS_ERROR } from './restaurant';
import * as nock from 'nock';
import { apiEndPoint } from '../config/endpoints';

beforeAll(() => {
    nock.disableNetConnect();
});

test('dispatches error action in case of fetch errors', async () => {
    nock(apiEndPoint).get('/v1/order-management/restaurants').reply(500, 'error');

    const dispatcher = jest.fn();
    await fetchRestaurants()(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({ type: FETCH_RESTAURANTS_ERROR });
});
