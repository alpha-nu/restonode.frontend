import { ISwitchLogin } from './login';
import { IFetchRestaurants, ISelectRestaurant } from './restaurant';
import { IFetchMeals, IModifyOrder } from './meal';

export type RestonodeAction =
    ISwitchLogin
    | IFetchRestaurants
    | ISelectRestaurant
    | IFetchMeals
    | IModifyOrder;
