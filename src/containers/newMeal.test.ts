import { mapStateToProps, mapDispatchToProps } from './newMeal';
import { IStoreState } from '../store';

test('maps state to props', () => {
    const initialState: IStoreState = {
        restaurants: { all: [], selected: { id: 0, name: 'fancy eats', address: '', rating: '' } },
        user: {
            current: { canCreateRestaurant: true, orders: [], userName: 'joe' },
            logins: []
        },
        createdMeal: { name: 'meal', description: 'so good' }
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.selectedRestaurant).toEqual({ id: 0, name: 'fancy eats', address: '', rating: '' });
    expect(mappedProps.createdMeal).toEqual({ name: 'meal', description: 'so good' });
});

test('map dispatch to props', () => {
    const dispatch = jest.fn();

    const mappedDispatches = mapDispatchToProps(dispatch);

    expect(mappedDispatches.newMeal).toBeInstanceOf(Function);
});
