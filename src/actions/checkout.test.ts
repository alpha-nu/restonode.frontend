import { checkout, ORDER_CHECKOUT_ERROR } from './checkout';
import { ILogin } from 'src/store';

test('dispatches error action in case of fetch errors', async () => {
    const orders: ILogin = { userName: '', orders: [], canCreateRestaurant: false };
    const dispatcher = jest.fn();
    await checkout(orders)(dispatcher);

    expect(dispatcher.mock.calls[1][0]).toEqual({ type: ORDER_CHECKOUT_ERROR });
});
