import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App, { mapStateToProps, mapDispatchToProps } from './app';
import { IStoreState } from '../store';
import { SWITCH_LOGIN } from '../actions/login';
import { FETCH_RESTAURANTS_REQUEST, FETCH_RESTAURANTS_SUCCESS, SELECT_RESTAURANT } from '../actions/restaurant';
import * as nock from 'nock';
import { apiEndPoint } from '../config/endpoints';

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

test('map logins state to props', () => {
    const initialState: IStoreState = {
        restaurants: { all: [] },
        user: {
            logins: [],
            current: {
                userName: 'test',
                canCreateRestaurant: false
            }
        }
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.user).toEqual(initialState.user);
});

test('map restaurants to props', () => {
    const initialState: IStoreState = {
        user: { logins: [], current: { userName: '', canCreateRestaurant: false } },
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

test('map switchLogin to store dispatch', () => {
    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    mappedDispatches.switchLogin('test');

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: SWITCH_LOGIN,
        userName: 'test'
    });
});

test('map fetchRestaurants to store dispatch', async () => {

    nock(apiEndPoint).get('/v1/order-management/restaurants').reply(200,
        {
            restaurants: [
                {
                    name: 'great eats',
                    score: 8,
                    id: 1,
                    address: 'address'
                },
                {
                    name: 'fancy eats',
                    score: undefined,
                    id: 2,
                    address: 'address 2'
                }]
        }, { 'Access-Control-Allow-Origin': '*' });

    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    await mappedDispatches.fetchRestaurants();

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: FETCH_RESTAURANTS_REQUEST
    });

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: FETCH_RESTAURANTS_SUCCESS,
        response: [
            { id: 1, name: 'great eats', address: 'address', rating: '8' },
            { id: 2, name: 'fancy eats', address: 'address 2', rating: 'n/a' }
        ]
    });
});

test('map selectRestaurant to store dispatch', () => {
    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    mappedDispatches.selectRestaurant(4);

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: SELECT_RESTAURANT,
        id: 4
    });
});
