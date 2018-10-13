import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Menu from '.';
import { IRestaurant } from '../../store';
import { createHashHistory } from 'history';

enzyme.configure({ adapter: new Adapter() });

test('renders meals of a selected restaurant', () => {
    const restaurant: IRestaurant = {
        id: 1,
        name: 'fancy eats',
        address: '',
        rating: '',
        meals: [
            { id: 1, description: 'tasty', name: 'noodles', price: 919 }
        ]
    };
    const menu = shallow(<Menu
        match={{ params: { id: '1' }, isExact: false, url: '', path: '' }}
        history={createHashHistory()}
        location={{ pathname: '', state: '', hash: '', search: '' }}
        addMeal={jest.fn()}
        selectedRestaurant={restaurant}
        selectRestaurant={jest.fn()} />);

    const html = menu.html();
    expect(html).toContain('fancy eats');
    expect(html).toContain('noodles');
    expect(html).toContain('tasty');
    expect(html).toContain('919');
});

test('<Menu /> dispatches selectRestaurant event', () => {
    const selectRestaurant = jest.fn();
    enzyme.mount(<Menu
        match={{ params: { id: '1' }, isExact: false, url: '', path: '' }}
        history={createHashHistory()}
        location={{ pathname: '', state: '', hash: '', search: '' }}
        addMeal={jest.fn()}
        selectedRestaurant={ { id: 1, name: 'one', address: 'address', rating: '1' }}
        selectRestaurant={selectRestaurant} />);

    expect(selectRestaurant.mock.calls[0][0]).toBe(1);
});

test('dispatches addMeal event', () => {
    const restaurant: IRestaurant = {
        id: 1,
        name: 'fancy eats',
        address: '',
        rating: '',
        meals: [
            { id: 1, description: 'tasty', name: 'noodles', price: 100 },
            { id: 2, description: 'yummy', name: 'burger', price: 120 }
        ]
    };
    const addMeal = jest.fn();
    const menu = enzyme.mount(<Menu
        match={{ params: { id: '1' }, isExact: false, url: '', path: '' }}
        history={createHashHistory()}
        location={{ pathname: '', state: '', hash: '', search: '' }}
        addMeal={addMeal}
        selectedRestaurant={restaurant}
        selectRestaurant={jest.fn()} />);

    menu.find('WithStyles(Button)').first().simulate('click');
    menu.find('WithStyles(Button)').last().simulate('click');

    expect(addMeal.mock.calls[0][0]).toEqual({
        id: 1,
        description: 'tasty',
        name: 'noodles',
        price: 100
    });

    expect(addMeal.mock.calls[1][0]).toEqual({
        id: 2,
        description: 'yummy',
        name: 'burger',
        price: 120
    });
});
