import {
    IFetchMeals,
    FETCH_MEALS_ERROR,
    INewMeal,
    NEW_MEAL_ERROR
} from '../actions/meal';
import {
    IFetchRestaurants,
    FETCH_RESTAURANTS_ERROR,
    INewRestaurant,
    NEW_RESTAURANT_ERROR
} from '../actions/restaurant';
import {
    ORDER_CHECKOUT_ERROR,
    IOrderCheckout
} from '../actions/checkout';

export default (state: boolean = false, action: IFetchMeals
    | IFetchRestaurants
    | IOrderCheckout
    | INewRestaurant
    | INewMeal): boolean => {

    switch (action.type) {
        case FETCH_MEALS_ERROR:
        case FETCH_RESTAURANTS_ERROR:
        case ORDER_CHECKOUT_ERROR:
        case NEW_RESTAURANT_ERROR:
        case NEW_MEAL_ERROR:
            return true;
        default:
            return false;
    }
};
