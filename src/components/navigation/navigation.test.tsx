import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Navigation from '.';
import Logins from '../logins';
import { IUser } from '../../store';

enzyme.configure({ adapter: new Adapter() });

test('<Navigation/> renders its child components', () => {
    const user: IUser = { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } };
    const navigation = shallow(<Navigation user={user} switchLogin={jest.fn()} />);
    expect(navigation.find(Logins).exists()).toBe(true);
});
