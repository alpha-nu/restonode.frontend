import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import HelloContainer from './_';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

enzyme.configure({ adapter: new Adapter() });

test('Hello container is connected to the store', () => {

    const store = mockStore();

    const hello = shallow(
        <Provider store={store}>
            <HelloContainer />
        </Provider>
    );
    expect(hello.find('Connect(Hello)').length).toBe(1);
});
