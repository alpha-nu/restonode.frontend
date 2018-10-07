import { ISwitchLogin } from './login';
import { IFetchRestaurants, ISelectRestaurant } from './restaurant';
import { IFetchMeals } from './meal';

export type RestonodeAction =
    ISwitchLogin
    | IFetchRestaurants
    | ISelectRestaurant
    | IFetchMeals;
