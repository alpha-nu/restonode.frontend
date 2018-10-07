import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Order from '.';
import { ILogin } from '../../store';

enzyme.configure({ adapter: new Adapter() });

test('<Order/> renders a user order of meals', () => {
    const user: ILogin = { userName: '', canCreateRestaurant: false, orders: [] };

    const order = shallow(<Order loggedInUser={user} />);

    expect(order.find('h2').text()).toEqual('online order');
});
