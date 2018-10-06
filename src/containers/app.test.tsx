import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App, { mapStateToProps, mapDispatchToProps } from './app';
import { IStoreState } from '../store';
import { SWITCH_LOGIN } from '../actions/login';
import { FETCH_RESTAURANTS_REQUEST, FETCH_RESTAURANTS_SUCCESS } from '../actions/restaurant';
import * as nock from 'nock';

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
        logins: [{
            userName: 'test',
            canCreateRestaurant: false,
            loggedIn: true
        }], restaurants: []
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.logins).toEqual([{
        userName: 'test',
        canCreateRestaurant: false,
        loggedIn: true
    }]);
});

test('map restaurants to props', () => {
    const initialState: IStoreState = {
        logins: [],
        restaurants: [{ name: 'test', address: 'address', rating: '7', id: 1 }]
    };

    const mappedProps = mapStateToProps(initialState);

    expect(mappedProps.restaurants).toEqual([{
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

    nock('http://localhost:3000')
        .get('/v1/order-management/restaurants')
        .reply(200, {
            restaurants: [
                {
                    name: 'great eats',
                    score: 8,
                    id: 1,
                    address: 'address'
                }]
        }, {
                'Access-Control-Allow-Origin': '*'
            });

    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    await mappedDispatches.fetchRestaurants();

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: FETCH_RESTAURANTS_REQUEST
    });

    expect(dispatcher.mock.calls[1][0]).toEqual({
        type: FETCH_RESTAURANTS_SUCCESS,
        response: [{ id: 1, name: 'great eats', address: 'address', rating: '8' }]
    });
});
