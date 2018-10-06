import * as React from 'react';
import * as enzyme from 'enzyme';
import { mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import App from './app';
import Navigation from './navigation';
import Order from './order';
import Restaurants from './restaurants';
import { MemoryRouter } from 'react-router';

enzyme.configure({ adapter: new Adapter() });

test('<App/> renders its child components', () => {
    const app = mount(
        <MemoryRouter initialEntries={['/restaurants']} initialIndex={0}>
            <App logins={[]} switchLogin={jest.fn()} restaurants={[]} fetchRestaurants={jest.fn()} />
        </MemoryRouter>
    );
    expect(app.find(Navigation).exists()).toBe(true);
    expect(app.find(Order).exists()).toBe(true);
    expect(app.find(Restaurants).exists()).toBe(true);
});
