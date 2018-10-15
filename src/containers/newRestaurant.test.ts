import { mapStateToProps, mapDispatchToProps } from './newRestaurant';
import { IStoreState } from '../store';
import { NEW_RESTAURANT_INIT } from '../actions/restaurant';

test('maps state to props', () => {
    const initialState: IStoreState = {
        restaurants: { all: [] },
        user: {
            current: { canCreateRestaurant: true, orders: [], userName: 'joe' },
            logins: []
        },
        createdRestaurant: { name: 'test' }
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.owner).toEqual('joe');
    expect(mappedProps.createdRestaurant).toEqual({ name: 'test' });
});

test('map dispatch to props', () => {
    const dispatch = jest.fn();

    const mappedDispatches = mapDispatchToProps(dispatch);

    expect(mappedDispatches.newRestaurant).toBeInstanceOf(Function);

    mappedDispatches.initNewRestaurant();
    expect(dispatch.mock.calls[0][0].type).toEqual(NEW_RESTAURANT_INIT);
});
