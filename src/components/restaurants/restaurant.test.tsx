import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Restaurants from '.';
import { IRestaurants } from '../../store';

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

xtest('<Restaurants dispatches selectRestaurant event', () => {
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
    restaurants.find('Link').first().simulate('click');

    expect(selectRestaurant.mock.calls[0][0]).toBe(1);
});
