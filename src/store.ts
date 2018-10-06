import { createStore, combineReducers } from 'redux';
import logins from './reducers/logins';
import restaurants from './reducers/restaurants';

export interface ILogin {
    userName: string;
    canCreateRestaurant: boolean;
    active: boolean;
}

export interface IMeal {
    name: string;
    description: string;
    price: number;
}

export interface IRestaurant {
    id: number;
    name: string;
    address: string;
    rating: string;
    meals?: IMeal[];
}

export interface IStoreState {
    logins: ILogin[];
    restaurants?: IRestaurant[];
    selectedRestaurant?: IRestaurant;
}

export default createStore<IStoreState, any, any, {}>(
    combineReducers({
        restaurants,
        logins
    }),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
