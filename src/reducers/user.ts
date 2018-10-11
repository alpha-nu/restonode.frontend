import { IUser } from '../store';
import { ISwitchLogin, SWITCH_LOGIN } from '../actions/login';
import { IModifyOrder, ADD_MEAL_TO_ORDER } from '../actions/meal';
import { IOrderCheckout, ORDER_CHECKOUT_SUCCESS } from '../actions/checkout';

const initialState: IUser = {
    logins: [
        { userName: 'anonymous', canCreateRestaurant: false, orders: [] },
        { userName: 'hungryJoe', canCreateRestaurant: false, orders: [] },
        { userName: 'mrBigShot', canCreateRestaurant: true, orders: [] }
    ],
    current: {
        userName: 'hungryJoe', canCreateRestaurant: false, orders: []
    }
};

export default (user: IUser = initialState, action: ISwitchLogin | IModifyOrder | IOrderCheckout): IUser => {
    if (action.type === ADD_MEAL_TO_ORDER) {
        let orders = user.current.orders.map((order) => {
            let quantity = order.quantity;
            let total = order.total;
            if (order.meal.id === action.meal!.id) {
                quantity += 1;
                total = order.meal.price * quantity;
            }
            return {
                meal: { ...order.meal }, quantity, total
            };
        });

        if (user.current.orders.find(_ => _.meal.id === action.meal!.id) === undefined) {
            orders = [...orders,
            {
                meal: action.meal!,
                quantity: 1,
                total: action.meal!.price
            }];
        }

        return {
            ...user,
            current: {
                ...user.current,
                orders
            }
        };
    }

    if (action.type === SWITCH_LOGIN) {
        return {
            ...user,
            current: { ...user.logins.find(_ => _.userName === action.userName)! }
        };
    }

    if (action.type === ORDER_CHECKOUT_SUCCESS) {
        return {
            ...user,
            current: {
                ...user.current,
                orders: [],
                confirmation: action.response
            }
        };
    }

    return user;
};
