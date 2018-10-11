import {
    IFetchMeals,
    FETCH_MEALS_ERROR
} from '../actions/meal';
import {
    IFetchRestaurants,
    FETCH_RESTAURANTS_ERROR
} from '../actions/restaurant';
import {
    ORDER_CHECKOUT_ERROR,
    IOrderCheckout
} from '../actions/checkout';

export default (state: boolean = false, action: IFetchMeals
    | IFetchRestaurants
    | IOrderCheckout): boolean => {

    switch (action.type) {
        case FETCH_MEALS_ERROR:
        case FETCH_RESTAURANTS_ERROR:
        case ORDER_CHECKOUT_ERROR:
            return true;
        default:
            return state;
    }
};
