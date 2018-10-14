import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Restaurants from '.';
import { IRestaurants } from '../../store';
import { MemoryRouter } from 'react-router';

enzyme.configure({ adapter: new Adapter() });

test('<Restaurants /> renders a list of restaurants', () => {
    const state: IRestaurants = {
        all: [
            { id: 1, name: 'one', address: 'address', rating: '123' }
        ]
    };
    const restaurants = enzyme.mount(
        <MemoryRouter>
            <Restaurants
                fetchRestaurants={jest.fn()}
                restaurants={state} />
        </MemoryRouter>
    );

    const card = restaurants.find('WithStyles(Card)');
    expect(card.length).toBe(1);
    expect(card.html()).toContain('one');
    expect(card.html()).toContain('address');
    expect(card.html()).toContain('123');
});
