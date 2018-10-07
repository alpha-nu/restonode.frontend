import reducer from './user';
import { SWITCH_LOGIN } from '../actions/login';
import { IUser } from '../store';

test('sets loggedIn flag to true when user is switched and resets the rest', () => {
    const initialLogins: IUser = {
        logins: [
            { userName: 'anonymous', canCreateRestaurant: false },
            { userName: 'hungryJoe', canCreateRestaurant: false },
            { userName: 'mrBigShot', canCreateRestaurant: true }
        ],
        current: { userName: 'mrBigShot', canCreateRestaurant: true }
    };

    const logins = reducer(initialLogins, { type: SWITCH_LOGIN, userName: 'hungryJoe' });
    expect(logins.current).toEqual({ userName: 'hungryJoe', canCreateRestaurant: false });
});

test('return initial state for unknown action types', () => {
    const initialState: any = [];
    const logins = reducer(initialState, { type: 'UNKNOWN', userName: 'hungryJoe' } as any);
    expect(logins).toBe(initialState);
});
