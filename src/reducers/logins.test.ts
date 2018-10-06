import reducer from './logins';
import { SWITCH_LOGIN } from '../actions/login';
import { ILogin } from '../store';

test('sets loggedIn flag to true when user is switched and resets the rest', () => {
    const initialLogins: ILogin[] = [
        { userName: 'anonymous', canCreateRestaurant: false, active: false },
        { userName: 'hungryJoe', canCreateRestaurant: false, active: false },
        { userName: 'mrBigShot', canCreateRestaurant: true, active: true }
    ];

    const logins = reducer(initialLogins, { type: SWITCH_LOGIN, userName: 'hungryJoe' });
    expect(logins.map(_ => _.active)).toEqual([false, true, false]);
});

test('return initial state for unknown action types', () => {
    const initialState: any = [];
    const logins = reducer(initialState, { type: 'UNKNOWN', userName: 'hungryJoe' } as any);
    expect(logins).toBe(initialState);
});
