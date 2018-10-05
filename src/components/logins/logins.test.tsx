import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Logins from '.';

enzyme.configure({ adapter: new Adapter() });

const userLogins = [
    { userName: 'joe', canCreateRestaurant: false, loggedIn: false },
    { userName: 'pete', canCreateRestaurant: false, loggedIn: false }
];

test('<Logins/> renders a list of user logins', () => {
    const logins = shallow(<Logins logins={userLogins} switchLogin={jest.fn()} />);
    expect(logins.find('.user-login').first().text()).toEqual('joe');
    expect(logins.find('.user-login').last().text()).toEqual('pete');
});

test('<Logins/> dispatches switch user event', () => {
    const onSwitchLogin = jest.fn();
    const logins = shallow(<Logins logins={userLogins} switchLogin={onSwitchLogin} />);
    logins.find('.user-login').first().simulate('click');
    expect(onSwitchLogin.mock.calls[0][0]).toEqual('joe');
});
