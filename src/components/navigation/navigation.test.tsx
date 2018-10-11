import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Navigation from '.';
import { IUser } from '../../store';

enzyme.configure({ adapter: new Adapter() });

test('<Navigation/> renders its child components', () => {
    const user: IUser = { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } };
    shallow(<Navigation
        hasError={false}
        isFetching={false}
        user={user}
        loggedInUser={user.current}
        checkout={jest.fn()}
        switchLogin={jest.fn()} />);
});
