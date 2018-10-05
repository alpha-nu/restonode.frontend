import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App, { mapStateToProps, mapDispatchToProps } from './app';
import { IStoreState } from '../store';
import { SWITCH_LOGIN } from '../actions/switchLogin';

const mockStore = configureMockStore();

enzyme.configure({ adapter: new Adapter() });

test('App container is connected to the store', () => {
    const store = mockStore();
    const app = shallow(
        <Provider store={store}>
            <App />
        </Provider>
    );
    expect(app.find('Connect(App)').length).toBe(1);
});

test('mapStateToProps', () => {
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

test('mapDispatchToProps', () => {
    const dispatcher = jest.fn();
    const mappedDispatches = mapDispatchToProps(dispatcher);

    mappedDispatches.switchLogin('test');

    expect(dispatcher.mock.calls[0][0]).toEqual({
        type: SWITCH_LOGIN,
        userName: 'test'
    });
});
