import { ILogin } from '../store';
import { ISwitchLogin, SWITCH_LOGIN } from '../actions/switchLogin';

const initialLogins = [
    { userName: 'anonymous', canCreateRestaurant: false, loggedIn: false },
    { userName: 'hungryJoe', canCreateRestaurant: false, loggedIn: false },
    { userName: 'mrBigShot', canCreateRestaurant: true, loggedIn: false }
];

export default (logins: ILogin[] = initialLogins, action: ISwitchLogin): ILogin[] => {
    if (action.type !== SWITCH_LOGIN) { return logins; }
    return logins.map(_ => {
        if (_.userName !== action.userName) { return _; }
        return { ..._, loggedIn: true };
    });
};
