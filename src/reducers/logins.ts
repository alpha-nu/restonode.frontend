import { ILogin } from '../store';
import { ISwitchLogin, SWITCH_LOGIN } from '../actions/login';

const initialLogins = [
    { userName: 'anonymous', canCreateRestaurant: false, loggedIn: false },
    { userName: 'hungryJoe', canCreateRestaurant: false, loggedIn: false },
    { userName: 'mrBigShot', canCreateRestaurant: true, loggedIn: false }
];

export default (logins: ILogin[] = initialLogins, action: ISwitchLogin): ILogin[] => {
    if (action.type !== SWITCH_LOGIN) { return logins; }
    return logins.map(_ => {
        return { ..._, loggedIn: _.userName === action.userName };
    });
};
