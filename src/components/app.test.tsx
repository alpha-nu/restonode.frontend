import * as React from 'react';
import * as enzyme from 'enzyme';
import { mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import App from './app';
import Navigation from './navigation';
import Restaurants from './restaurants';
import { MemoryRouter } from 'react-router';
import Menu from './menu';
import { IUser } from '../store';

enzyme.configure({ adapter: new Adapter() });

const user: IUser = {
    current: { canCreateRestaurant: false, userName: '', orders: [] },
    logins: []
};

const app = <App user={user}
    addMeal={jest.fn()}
    checkout={jest.fn()}
    loggedInUser={user.current}
    switchLogin={jest.fn()}
    restaurants={{ all: [], selected: { address: '', id: 0, name: '', rating: '' } }}
    fetchRestaurants={jest.fn()}
    selectRestaurant={jest.fn()}
    fetchMeals={jest.fn()}
    selectedRestaurant={{ name: '', id: 0, address: '', rating: '' }} />;

test('<App /> renders its child components and defaults to restaurant view', () => {

    const mountedApp = mount(
        <MemoryRouter initialEntries={['/restaurants', '/restaurants/1']} initialIndex={0}>
            {app}
        </MemoryRouter>
    );
    expect(mountedApp.find(Navigation).exists()).toBe(true);
    expect(mountedApp.find(Restaurants).exists()).toBe(true);
    expect(mountedApp.find(Menu).exists()).toBe(false);
});

test('<App /> renders menu view for a selected restaurant', () => {
    const mountedApp = mount(
        <MemoryRouter initialEntries={['/restaurants', '/restaurants/1']} initialIndex={1}>
            {app}
        </MemoryRouter>
    );
    expect(mountedApp.find(Navigation).exists()).toBe(true);
    expect(mountedApp.find(Restaurants).exists()).toBe(false);
    expect(mountedApp.find(Menu).exists()).toBe(true);
});
