import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App, { mapStateToProps, mapDispatchToProps } from './app';
import { IStoreState } from '../store';
import * as nock from 'nock';
import { ADD_MEAL_TO_ORDER } from '../actions/meal';
import { SELECT_RESTAURANT } from '../actions/restaurant';
import { SWITCH_LOGIN } from '../actions/login';

const mockStore = configureMockStore();

enzyme.configure({ adapter: new Adapter() });

beforeAll(() => {
    nock.disableNetConnect();
});

beforeEach(nock.cleanAll);

test('App container is connected to the store', () => {
    const store = mockStore();
    const app = shallow(
        <Provider store={store}>
            <App />
        </Provider>
    );
    expect(app.find('Connect(App)').length).toBe(1);
});

test('map user state to props', () => {
    const initialState: IStoreState = {
        restaurants: { all: [] },
        user: {
            logins: [],
            current: {
                userName: 'test',
                canCreateRestaurant: false,
                orders: []
            }
        }
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.user).toEqual(initialState.user);
});

test('map restaurants to props', () => {
    const initialState: IStoreState = {
        user: { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } },
        restaurants: { all: [{ name: 'test', address: 'address', rating: '7', id: 1 }] }
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.restaurants.all).toEqual([{
        name: 'test',
        address: 'address',
        rating: '7',
        id: 1
    }]);
});

test('map loggedInUser to props', () => {
    const initialState: IStoreState = {
        user: { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } },
        restaurants: { all: [] }
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.loggedInUser).toEqual({ userName: '', canCreateRestaurant: false, orders: [] });
});

test('map selectedRestaurant to props', () => {
    const initialState: IStoreState = {
        user: { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } },
        restaurants: { all: [], selected: { name: 'test', address: 'address', rating: '7', id: 1 } }
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.selectedRestaurant).toEqual({ name: 'test', address: 'address', rating: '7', id: 1 });
});

test('map hasError to props', () => {
    const initialState: IStoreState = {
        user: { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } },
        restaurants: { all: [] },
        hasError: true
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.hasError).toBe(true);
});

test('maps isFetching to props', () => {
    const initialState: IStoreState = {
        user: { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } },
        restaurants: { all: [] },
        isFetching: true
    };
    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.isFetching).toBe(true);
});

test('map switchLogin to store dispatch', () => {
    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);
    mappedDispatches.switchLogin('');

    expect(dispatcher.mock.calls[0][0].type).toEqual(SWITCH_LOGIN);
});

test('map fetchRestaurants to store dispatch', async () => {

    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    expect(mappedDispatches.fetchRestaurants()).toBeInstanceOf(Promise);
});

test('map selectRestaurant to store dispatch', () => {
    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    mappedDispatches.selectRestaurant(1);

    expect(dispatcher.mock.calls[0][0].type).toEqual(SELECT_RESTAURANT);
});

test('map fetchMeals to store dispatch', async () => {

    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    expect(mappedDispatches.fetchMeals(1)).toBeInstanceOf(Promise);
});

test('map add meal to store dispatch', () => {
    const dispatcher = jest.fn();

    mapDispatchToProps(dispatcher).addMeal({
        description: '',
        id: 1,
        name: '',
        price: 0
    });

    expect(dispatcher.mock.calls[0][0].type).toEqual(ADD_MEAL_TO_ORDER);
});

test('map checkout to dispatches', () => {

    const dispatcher = jest.fn();
    const checkout = mapDispatchToProps(dispatcher).checkout({
        canCreateRestaurant: false,
        orders: [],
        userName: ''
    });
    expect(checkout).toBeInstanceOf(Promise);
});
