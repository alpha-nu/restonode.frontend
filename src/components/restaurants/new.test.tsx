import NewRestaurant from './new';
import * as React from 'react';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';

enzyme.configure({ adapter: new Adapter() });

test('renders success message', () => {
    const resetDelegate = jest.fn();
    const newRestaurant = enzyme.mount(
        <MemoryRouter>
            <NewRestaurant owner={'mrBigShot'}
                newRestaurant={jest.fn()}
                createdRestaurant={{ name: 'fancy eats' }}
                initNewRestaurant={resetDelegate}
            />
        </MemoryRouter>
    );

    expect(newRestaurant.find('TextField').length).toBe(0);
    expect(newRestaurant.html()).toContain('fancy eats was created successfully');

    newRestaurant.find('Button').simulate('click');
    expect(resetDelegate.mock.calls.length).toBe(1);
});

test('renders validation errors', () => {
    const newRestaurant = enzyme.mount(
        <NewRestaurant owner={'mrBigShot'} createdRestaurant={
            {
                validationErrors: {
                    name: 'name error',
                    address: 'address error',
                    email: 'email error'
                }
            }
        } />
    );

    expect(newRestaurant.find('TextField').at(0).prop('helperText')).toBe('name error');
    expect(newRestaurant.find('TextField').at(1).prop('helperText')).toBe('address error');
    expect(newRestaurant.find('TextField').at(2).prop('helperText')).toBe('email error');
});
