import { createStore, combineReducers } from 'redux';
import user from './reducers/user';
import restaurants from './reducers/restaurants';
import isFetching from './reducers/isFetching';
import hasError from './reducers/hasError';

export interface ILogin {
    userName: string;
    canCreateRestaurant: boolean;
    orders: IOrder[];
    confirmation?: IOrderConfirmation;
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
    total: number;
    meal: IMeal;
    quantity: number;
}

export interface IDelivery {
    restaurant: {name: string, email: string};
    eta: string;
    subTotal: number;
    meals: Array<{ name: string, quantity: number }>;
}

export interface IOrderConfirmation {
    deliveries: IDelivery[];
    customer: {userName: string, phone: string, address: string};
    grandTotal: number;
}

export interface IStoreState {
    user: IUser;
    restaurants: IRestaurants;
    isFetching?: boolean;
    hasError?: boolean;
}

export default createStore<IStoreState, any, any, {}>(
    combineReducers({
        restaurants,
        user,
        isFetching,
        hasError
    }),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
