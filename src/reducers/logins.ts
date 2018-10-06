import { ILogin } from '../store';
import { ISwitchLogin, SWITCH_LOGIN } from '../actions/login';

const initialLogins: ILogin[] = [
    { userName: 'anonymous', canCreateRestaurant: false, active: true },
    { userName: 'hungryJoe', canCreateRestaurant: false, active: false },
    { userName: 'mrBigShot', canCreateRestaurant: true, active: false }
];

export default (logins: ILogin[] = initialLogins, action: ISwitchLogin): ILogin[] => {
    if (action.type !== SWITCH_LOGIN) { return logins; }
    return logins.map(_ => {
        return { ..._, active: _.userName === action.userName };
    });
};
