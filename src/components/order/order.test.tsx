import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Order from '.';
import { ILogin } from '../../store';
import { MemoryRouter } from 'react-router';

enzyme.configure({ adapter: new Adapter() });

test('<Order/> renders a user order of meals', () => {
    const user: ILogin = {
        userName: '', canCreateRestaurant: false, orders: [
            { meal: { id: 1, name: 'awesome meal', description: 'super tasty', price: 2 }, quantity: 99, total: 198 }
        ]
    };

    const order = shallow(<MemoryRouter><Order loggedInUser={user} checkout={jest.fn()} /></MemoryRouter>);

    const html = order.html();
    expect(html).toContain('awesome meal');
    expect(html).toContain('99');
    expect(html).toContain('198');
});

test('<Order/> initiates order checkout', () => {
    const user: ILogin = {
        userName: '', canCreateRestaurant: false, orders: [
            { meal: { id: 1, name: 'meal', description: 'tasty', price: 40 }, quantity: 2, total: 80 }
        ]
    };

    const checkout = jest.fn();
    const order = enzyme.mount(<MemoryRouter><Order loggedInUser={user} checkout={checkout} /></MemoryRouter>);
    order.find('WithStyles(Button)').first().simulate('click');

    expect(checkout.mock.calls[0][0]).toEqual(user);
});
