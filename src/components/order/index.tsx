import * as React from 'react';
import { ILogin, IOrder } from '../../store';

export interface IOrderProps {
    loggedInUser: ILogin;
}

export default class Order extends React.Component<IOrderProps> {
    orderItem = ({ meal, quantity, total }: IOrder) => (
        <div key={meal.id} className='order-item'>
            <span className='name'>{meal.name}</span>
            <span className='quantity'>{quantity}</span>
            <span className='total'>{total}</span>
        </div>
    );
    public render() {
        return (
            <div>
                <h2>online order</h2>
                {this.props.loggedInUser.orders.map(this.orderItem)}
            </div>
        );
    }
}
