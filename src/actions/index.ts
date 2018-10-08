import { ISwitchLogin } from './login';
import { IFetchRestaurants, ISelectRestaurant } from './restaurant';
import { IFetchMeals, IModifyOrder } from './meal';
import { IOrderCheckout } from './checkout';

export type RestonodeAction =
    ISwitchLogin
    | IFetchRestaurants
    | ISelectRestaurant
    | IFetchMeals
    | IModifyOrder
    | IOrderCheckout;
