import { ISwitchLogin } from './login';
import { IFetchRestaurants, ISelectRestaurant, INewRestaurant } from './restaurant';
import { IFetchMeals, IModifyOrder, INewMEAL } from './meal';
import { IOrderCheckout } from './checkout';

export type RestonodeAction =
    ISwitchLogin
    | IFetchRestaurants
    | ISelectRestaurant
    | IFetchMeals
    | IModifyOrder
    | IOrderCheckout
    | INewRestaurant
    | INewMEAL;
