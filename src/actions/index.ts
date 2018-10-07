import { ISwitchLogin } from './login';
import { IFetchRestaurants, ISelectRestaurant } from './restaurant';

export type RestonodeAction =
    ISwitchLogin
    | IFetchRestaurants
    | ISelectRestaurant;
