import { switchLogin, SWITCH_LOGIN } from './login';

test('switchLogin', () => {
    const action = switchLogin('joe');

    expect(action).toEqual({
        type: SWITCH_LOGIN,
        userName: 'joe'
    });
});
