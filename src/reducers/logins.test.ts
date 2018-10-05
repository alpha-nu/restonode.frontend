import reducer from './logins';
import { SWITCH_LOGIN } from '../actions/switchLogin';

test('sets loggedIn flag to true when user is switched', () => {
    const initialLogins = [
        { userName: 'anonymous', canCreateRestaurant: false, loggedIn: false },
        { userName: 'hungryJoe', canCreateRestaurant: false, loggedIn: false },
        { userName: 'mrBigShot', canCreateRestaurant: true, loggedIn: false }
    ];

    const logins = reducer(initialLogins, { type: SWITCH_LOGIN, userName: 'hungryJoe' });
    expect(logins.map(_ => _.loggedIn)).toEqual([false, true, false]);
});

test('return initial state for unknown action types', () => {
    const initialState: any = [];
    const logins = reducer(initialState, { type: 'UNKNOWN', userName: 'hungryJoe' } as any);
    expect(logins).toBe(initialState);
});
