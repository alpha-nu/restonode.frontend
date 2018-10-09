import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Logins from '.';
import { IUser } from '../../store';

enzyme.configure({ adapter: new Adapter() });

const user: IUser = {
    current: { userName: 'joe', canCreateRestaurant: false, orders: [] },
    logins: [
        { userName: 'joe', canCreateRestaurant: false, orders: [] },
        { userName: 'pete', canCreateRestaurant: false, orders: [] }
    ]
};

test('<Logins/> renders a list of user logins', () => {
    const logins = shallow(<Logins user={user} switchLogin={jest.fn()} />);
    expect(logins.find('.user-login')).toHaveLength(2);
    expect(logins.html()).toContain('joe');
    expect(logins.html()).toContain('pete');
});

test('<Logins/> dispatches switch user event', () => {
    const onSwitchLogin = jest.fn();
    const logins = shallow(<Logins user={user} switchLogin={onSwitchLogin} />);
    logins.find('WithStyles(MenuItem)').first().simulate('click');
    expect(onSwitchLogin.mock.calls[0][0]).toEqual('joe');
});
