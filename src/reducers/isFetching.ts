import {
    IFetchMeals,
    FETCH_MEALS_REQUEST,
    FETCH_MEALS_SUCCESS,
    FETCH_MEALS_ERROR,
    INewMeal,
    NEW_MEAL_REQUEST,
    NEW_MEAL_SUCCESS,
    NEW_MEAL_ERROR,
    NEW_MEAL_VALIDATION_ERROR
} from '../actions/meal';
import {
    IFetchRestaurants,
    FETCH_RESTAURANTS_REQUEST,
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_ERROR,
    INewRestaurant,
    NEW_RESTAURANT_REQUEST,
    NEW_RESTAURANT_ERROR,
    NEW_RESTAURANT_VALIDATION_ERROR,
    NEW_RESTAURANT_SUCCESS
} from '../actions/restaurant';
import {
    ORDER_CHECKOUT_REQUEST,
    ORDER_CHECKOUT_SUCCESS,
    ORDER_CHECKOUT_ERROR,
    IOrderCheckout
} from '../actions/checkout';

export default (state: boolean = false, action: IFetchMeals
    | IFetchRestaurants
    | IOrderCheckout
    | INewRestaurant
    | INewMeal): boolean => {

    switch (action.type) {
        case FETCH_MEALS_REQUEST:
        case FETCH_RESTAURANTS_REQUEST:
        case ORDER_CHECKOUT_REQUEST:
        case NEW_RESTAURANT_REQUEST:
        case NEW_MEAL_REQUEST:
            return true;
        case FETCH_MEALS_SUCCESS:
        case FETCH_MEALS_ERROR:
        case FETCH_RESTAURANTS_SUCCESS:
        case FETCH_RESTAURANTS_ERROR:
        case ORDER_CHECKOUT_SUCCESS:
        case ORDER_CHECKOUT_ERROR:
        case NEW_RESTAURANT_SUCCESS:
        case NEW_RESTAURANT_ERROR:
        case NEW_RESTAURANT_VALIDATION_ERROR:
        case NEW_MEAL_SUCCESS:
        case NEW_MEAL_ERROR:
        case NEW_MEAL_VALIDATION_ERROR:
            return false;
        default:
            return state;
    }
};
