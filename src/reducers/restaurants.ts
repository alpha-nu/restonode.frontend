import { IRestaurant } from '../store';
import { RestonodeAction } from '../actions';
import { FETCH_RESTAURANTS_SUCCESS } from '../actions/restaurant';

export default (state: IRestaurant[] = [], action: RestonodeAction): IRestaurant[] => {
    if (action.type === FETCH_RESTAURANTS_SUCCESS) {
        return action.response!;
    }
    return state;
};
