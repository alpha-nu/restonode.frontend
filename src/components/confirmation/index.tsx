import * as React from 'react';
import { IOrderConfirmation, IDelivery } from 'src/store';

export interface IConfirmationProps {
    order: IOrderConfirmation;
}

export default class Confirmation extends React.Component<IConfirmationProps> {
    deliveryFragment = (delivery: IDelivery, deliveryIndex: number) => (
        <div key={deliveryIndex}>
            {delivery.meals.map(({ name, quantity }, index) => (
                <div className='delivery-meal' key={index}>{name} (x{quantity})</div>
            ))}
            <div>
                from: <span className='delivery-restaurant'>
                    {delivery.restaurant.name}</span> in:
                <b className='delivery-eta'>{delivery.eta}</b>
            </div>
            <span className='delivery-subtotal'>{delivery.subTotal}</span>
        </div>
    );

    public render() {
        if (this.props.order === undefined) {
            return (<div></div>);
        }

        return this.props.order && (
            <div>
                <h2>confirmation</h2>
                <span>You'll receive:</span>
                {this.props.order.deliveries.map((delivery, index) => this.deliveryFragment(delivery, index))}
                <div>Grand Total: <span className='delivery-grandtotal'>{this.props.order.grandTotal}</span></div>
            </div>
        );
    }
}
