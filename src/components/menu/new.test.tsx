import NewMeal from './new';
import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';

enzyme.configure({ adapter: new Adapter() });

test('renders success message', () => {
    const resetDelegate = jest.fn();
    const newMeal = enzyme.mount(
        <MemoryRouter>
            <NewMeal
                selectedRestaurant={{ id: 1 }}
                newMeal={jest.fn()}
                createdMeal={{ name: 'meal', description: 'description' }}
                initNewMeal={resetDelegate}
            />
        </MemoryRouter>
    );

    expect(newMeal.find('TextField').length).toBe(0);
    expect(newMeal.html()).toContain('meal (description) was created successfully');

    newMeal.find('Button').simulate('click');
    expect(resetDelegate.mock.calls.length).toBe(1);
});

test('renders validation errors', () => {
    const newRestaurant = enzyme.mount(
        <NewMeal
            selectedRestaurant={{ id: 1 }}
            createdMeal={
                {
                    validationErrors: {
                        name: 'name error',
                        description: 'description error',
                        price: 'price error'
                    }
                }
            } />
    );

    expect(newRestaurant.find('TextField').at(0).prop('helperText')).toBe('name error');
    expect(newRestaurant.find('TextField').at(1).prop('helperText')).toBe('description error');
    expect(newRestaurant.find('TextField').at(2).prop('helperText')).toBe('price error');
});
