import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Confirmation from '.';
import { IOrderConfirmation } from 'src/store';
import { MemoryRouter } from 'react-router';

enzyme.configure({ adapter: new Adapter() });

test('renders order confirmation', () => {
    const order: IOrderConfirmation = {
        deliveries: [
            {
                restaurant: { name: 'fancy eats', email: '' },
                meals: [{ name: 'burger', quantity: 2 }],
                eta: '37 mins',
                subTotal: 999
            }
        ],
        grandTotal: 1111,
        customer: {
            address: '',
            phone: '',
            userName: ''
        }
    };
    const confirmation = shallow(<MemoryRouter><Confirmation order={order} /></MemoryRouter>);

    const html = confirmation.html();
    expect(html).toContain('fancy eats');
    expect(html).toContain('37 mins');
    expect(html).toContain('1111');
    expect(html).toContain('999');
    expect(html).toContain('burger (x2)');
});
