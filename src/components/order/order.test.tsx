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

    const order = shallow(<Order loggedInUser={user} />);

    expect(order.find('.order-item').find('.name').text()).toEqual('meal');
    expect(order.find('.order-item').find('.quantity').text()).toEqual('2');
    expect(order.find('.order-item').find('.total').text()).toEqual('80');
});
