import { IUser, IOrder } from '../store';
import { ISwitchLogin, SWITCH_LOGIN } from '../actions/login';
import { IModifyOrder, ADD_MEAL_TO_ORDER } from '../actions/meal';

const initialState: IUser = {
    logins: [
        { userName: 'anonymous', canCreateRestaurant: false, orders: [] },
        { userName: 'hungryJoe', canCreateRestaurant: false, orders: [] },
        { userName: 'mrBigShot', canCreateRestaurant: true, orders: [] }
    ],
    current: { userName: 'anonymous', canCreateRestaurant: false, orders: [] }
};

export default (user: IUser = initialState, action: ISwitchLogin | IModifyOrder): IUser => {
    if (action.type === ADD_MEAL_TO_ORDER) {
        let updatedOrders: IOrder[] = [];
        user.current.orders.forEach(order => {
            if (order.meal.id === action.meal!.id) {
                const quantity = order.quantity + 1;
                const total = quantity * order.meal.price;
                updatedOrders.push({ ...order, quantity, total});
            }
            else {
                updatedOrders.push({ ...order });
            }
        });

        if (updatedOrders.length === 0) {
            updatedOrders = [{ meal: action.meal!, quantity: 1, total: action.meal!.price }];
        }

        return {
            ...user,
            current: {
                ...user.current,
                orders: updatedOrders
            }
        };
    }

    if (action.type === SWITCH_LOGIN) {
        return {
            ...user,
            current: { ...user.logins.find(_ => _.userName === action.userName)! }
        };
    }

    return user;
};
