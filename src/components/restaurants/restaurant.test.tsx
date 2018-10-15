import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Restaurants from '.';
import { IRestaurants } from '../../store';
import { MemoryRouter } from 'react-router';

enzyme.configure({ adapter: new Adapter() });

const state: IRestaurants = {
    all: [
        { id: 1, name: 'one', address: 'address', rating: '123' }
    ]
};

test('<Restaurants /> renders a list of restaurants', () => {

    const restaurants = enzyme.mount(
        <MemoryRouter>
            <Restaurants
                canCreateRestaurant={false}
                fetchRestaurants={jest.fn()}
                restaurants={state} />
        </MemoryRouter>
    );

    const card = restaurants.find('WithStyles(Card)');
    expect(card.length).toBe(1);
    expect(card.html()).toContain('one');
    expect(card.html()).toContain('address');
    expect(card.html()).toContain('123');
    expect(restaurants.find('.new-restaurant-button').exists()).toBe(false);
});

test('<Restaurants /> renders a new restaurant button for authorized users', () => {
    const restaurants = enzyme.mount(
        <MemoryRouter>
            <Restaurants
                canCreateRestaurant={true}
                fetchRestaurants={jest.fn()}
                restaurants={state} />
        </MemoryRouter>
    );

    expect(restaurants.find('.new-restaurant-button').exists()).toBe(true);
});
