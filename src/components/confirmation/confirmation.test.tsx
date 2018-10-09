import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Confirmation from '.';
import { IOrderConfirmation } from 'src/store';

enzyme.configure({ adapter: new Adapter() });

test('renders order confirmation', () => {
    const order: IOrderConfirmation = {
        deliveries: [
            {
                restaurant: { name: 'fancy eats', email: '' },
                meals: [{ name: 'burger', quantity: 2 }],
                eta: '37 mins',
                subTotal: 100
            }
        ],
        grandTotal: 100,
        customer: {
            address: '',
            phone: '',
            userName: ''
        }
    };
    const confirmation = shallow(<Confirmation order={order} />);

    expect(confirmation.find('.delivery-restaurant').text()).toEqual('fancy eats');
    expect(confirmation.find('.delivery-eta').text()).toEqual('37 mins');
    expect(confirmation.find('.delivery-subtotal').text()).toEqual('100');
    expect(confirmation.find('.delivery-grandtotal').text()).toEqual('100');
    expect(confirmation.find('.delivery-meal').first().text()).toEqual('burger (x2)');
});
