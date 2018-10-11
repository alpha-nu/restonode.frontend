import {
    IFetchMeals,
    FETCH_MEALS_REQUEST,
    FETCH_MEALS_SUCCESS,
    FETCH_MEALS_ERROR
} from '../actions/meal';
import {
    IFetchRestaurants,
    FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_ERROR
} from '../actions/restaurant';
import {
    ORDER_CHECKOUT_REQUEST,
    ORDER_CHECKOUT_SUCCESS,
    ORDER_CHECKOUT_ERROR,
    IOrderCheckout
} from '../actions/checkout';

export default (state: boolean = false, action: IFetchMeals
    | IFetchRestaurants
    | IOrderCheckout): boolean => {

    switch (action.type) {
        case FETCH_MEALS_REQUEST:
        case FETCH_RESTAURANTS_REQUEST:
        case ORDER_CHECKOUT_REQUEST:
            return true;
        case FETCH_MEALS_SUCCESS:
        case FETCH_MEALS_ERROR:
        case FETCH_RESTAURANTS_SUCCESS:
        case FETCH_RESTAURANTS_ERROR:
        case ORDER_CHECKOUT_SUCCESS:
        case ORDER_CHECKOUT_ERROR:
            return false;
        default:
            return state;
    }
};
