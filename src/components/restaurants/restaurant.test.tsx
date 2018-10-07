import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Restaurants from '.';
import { IRestaurants } from '../../store';
import { Link } from 'react-router-dom';

enzyme.configure({ adapter: new Adapter() });

test('<Restaurants /> renders a list of restaurants', () => {
    const state: IRestaurants = {
        all: [
            { id: 1, name: 'one', address: 'address', rating: '1' }
        ]
    };
    const restaurants = shallow(<Restaurants
        selectRestaurant={jest.fn()}
        fetchRestaurants={jest.fn()}
        restaurants={state} />);

    expect(restaurants.find(Link).length).toBe(1);
    expect(restaurants.find('.restaurant-address').text()).toEqual('address');
    expect(restaurants.find('.restaurant-rating').text()).toEqual('1');
});

test('<Restaurants dispatches selectRestaurant event', () => {
    const state: IRestaurants = {
        all: [
            { id: 1, name: 'one', address: 'address', rating: '1' }
        ]
    };

    const selectRestaurant = jest.fn();
    const restaurants = shallow(<Restaurants
        selectRestaurant={selectRestaurant}
        fetchRestaurants={jest.fn()}
        restaurants={state} />);
    restaurants.find(Link).first().simulate('click');

    expect(selectRestaurant.mock.calls[0][0]).toBe(1);
});
