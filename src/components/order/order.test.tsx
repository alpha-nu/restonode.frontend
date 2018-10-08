import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Order from '.';
import { ILogin } from '../../store';

enzyme.configure({ adapter: new Adapter() });

test('<Order/> renders a user order of meals', () => {
    const user: ILogin = {
        userName: '', canCreateRestaurant: false, orders: [
            { meal: { id: 1, name: 'meal', description: 'tasty', price: 40 }, quantity: 2, total: 80 }
        ]
    };

    const order = shallow(<Order loggedInUser={user} checkout={jest.fn()} />);

    expect(order.find('.order-item').find('.name').text()).toEqual('meal');
    expect(order.find('.order-item').find('.quantity').text()).toEqual('2');
    expect(order.find('.order-item').find('.total').text()).toEqual('80');
});

test('<Order/> initiates order checkout', () => {
    const user: ILogin = {
        userName: '', canCreateRestaurant: false, orders: [
            { meal: { id: 1, name: 'meal', description: 'tasty', price: 40 }, quantity: 2, total: 80 }
        ]
    };

    const checkout = jest.fn();
    const order = shallow(<Order loggedInUser={user} checkout={checkout} />);
    order.find('.checkout').simulate('click');

    expect(checkout.mock.calls[0][0]).toEqual(user);
});
