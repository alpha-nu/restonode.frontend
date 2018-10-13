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
        fetchRestaurants={jest.fn()}
        restaurants={state} />);

});
