import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Menu from '.';
import { IRestaurant } from '../../store';

enzyme.configure({ adapter: new Adapter() });

test('renders meals of a selected restaurant', () => {
    const restaurant: IRestaurant = {
        id: 1,
        name: 'fancy eats',
        address: '',
        rating: '',
        meals: [
            { id: 1, description: 'tasty', name: 'noodles', price: 100 }
        ]
    };
    const menu = shallow(<Menu selectedRestaurant={restaurant} fetchMeals={jest.fn()} />);

    expect(menu.find('.selected-restaurant-name').text()).toEqual('fancy eats');
    expect(menu.find('.meal-name').text()).toEqual('noodles');
    expect(menu.find('.meal-description').text()).toEqual('tasty');
    expect(menu.find('.meal-price').text()).toEqual('100');
});
