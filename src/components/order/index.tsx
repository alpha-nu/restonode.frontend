import * as React from 'react';
import { ILogin, IOrder } from '../../store';
import { Link } from 'react-router-dom';

export interface IOrderProps {
    loggedInUser: ILogin;
    checkout: (user: ILogin) => void;
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
        if (this.props.loggedInUser.orders.length === 0) {
            return (<h2>No Orders.</h2>);
        }
        else {
            return (
                <div>
                    <h2>online order</h2>
                    {this.props.loggedInUser.orders.map(this.orderItem)}
                    <Link
                        onClick={
                            () => {
                                this.props.checkout(this.props.loggedInUser);
                            }
                        } to='/order-confirmation' className='checkout'>Checkout</Link>
                </div>
            );
        }
    }
}
