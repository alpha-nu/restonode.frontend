import * as React from 'react';
import * as enzyme from 'enzyme';
import { mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import App from './app';
import Navigation from './navigation';
import Order from './order';
import Restaurants from './restaurants';
import { MemoryRouter } from 'react-router';
import Menu from './menu';
import { IUser } from '../store';

enzyme.configure({ adapter: new Adapter() });

const user: IUser = {
    current: { canCreateRestaurant: false, userName: '' },
    logins: []
};

test('<App /> renders its child components and defaults to restaurant view', () => {

    const app = mount(
        <MemoryRouter initialEntries={['/restaurants', '/restaurants/1']} initialIndex={0}>
            <App user={user}
                switchLogin={jest.fn()}
                restaurants={{ all: [], selected: { address: '', id: 0, name: '', rating: '' } }}
                fetchRestaurants={jest.fn()}
                selectRestaurant={jest.fn()} />
        </MemoryRouter>
    );
    expect(app.find(Navigation).exists()).toBe(true);
    expect(app.find(Order).exists()).toBe(true);
    expect(app.find(Restaurants).exists()).toBe(true);
    expect(app.find(Menu).exists()).toBe(false);
});

test('<App /> renders menu view for a selected restaurant', () => {
    const app = mount(
        <MemoryRouter initialEntries={['/restaurants', '/restaurants/1']} initialIndex={1}>
            <App
                user={user}
                switchLogin={jest.fn()}
                restaurants={{ all: [], selected: { address: '', id: 0, name: '', rating: '' } }}
                fetchRestaurants={jest.fn()}
                selectRestaurant={jest.fn()} />
        </MemoryRouter>
    );
    expect(app.find(Navigation).exists()).toBe(true);
    expect(app.find(Order).exists()).toBe(true);
    expect(app.find(Restaurants).exists()).toBe(false);
    expect(app.find(Menu).exists()).toBe(true);
});
