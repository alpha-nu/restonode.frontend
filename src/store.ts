import { createStore, combineReducers } from 'redux';
import user from './reducers/user';
import restaurants from './reducers/restaurants';

export interface ILogin {
    userName: string;
    canCreateRestaurant: boolean;
    orders?: IOrder[];
}

export interface IMeal {
    name: string;
    description: string;
    price: number;
    id: number;
}

export interface IRestaurant {
    id: number;
    name: string;
    address: string;
    rating: string;
    meals?: IMeal[];
}

export interface IUser {
    logins: ILogin[];
    current: ILogin;
}

export interface IRestaurants {
    all: IRestaurant[];
    selected?: IRestaurant;
}

export interface IOrder {
    meal: IMeal;
    quantity: number;
    user: ILogin;
}

export interface IStoreState {
    user: IUser;
    restaurants: IRestaurants;
}

export default createStore<IStoreState, any, any, {}>(
    combineReducers({
        restaurants,
        user
    }),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
