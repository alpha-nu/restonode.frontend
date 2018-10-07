import { IUser } from '../store';
import { ISwitchLogin, SWITCH_LOGIN } from '../actions/login';

const initialState: IUser = {
    logins: [
        { userName: 'anonymous', canCreateRestaurant: false },
        { userName: 'hungryJoe', canCreateRestaurant: false },
        { userName: 'mrBigShot', canCreateRestaurant: true }
    ],
    current: { userName: 'anonymous', canCreateRestaurant: false }
};

export default (user: IUser = initialState, action: ISwitchLogin): IUser => {
    if (action.type !== SWITCH_LOGIN) { return user; }
    return {
        ...user,
        current: { ...user.logins.find(_ => _.userName === action.userName)! }
    };
};
