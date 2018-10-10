import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
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
    shallow(<Restaurants
        selectRestaurant={jest.fn()}
        fetchRestaurants={jest.fn()}
        restaurants={state} />);

});

test('<Restaurants dispatches selectRestaurant event', () => {
    const state: IRestaurants = {
        all: [
            { id: 1, name: 'one', address: 'address', rating: '1' }
        ]
    };

    const selectRestaurant = jest.fn();
    const restaurants = enzyme.mount(<MemoryRouter><Restaurants
        selectRestaurant={selectRestaurant}
        fetchRestaurants={jest.fn()}
        restaurants={state} /></MemoryRouter>);
    restaurants.find('WithStyles(Button)').first().simulate('click');

    expect(selectRestaurant.mock.calls[0][0]).toBe(1);
});
