import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Navigation from '.';
import { IUser } from '../../store';
import { MemoryRouter } from 'react-router';

enzyme.configure({ adapter: new Adapter() });

test('<Navigation/> renders error message', () => {
    const user: IUser = { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } };
    const navigation = shallow(
        <MemoryRouter>
            <Navigation
                hasError={true}
                isFetching={false}
                user={user}
                loggedInUser={user.current}
                checkout={jest.fn()}
                switchLogin={jest.fn()} />
        </MemoryRouter>);

    expect(navigation.html()).toContain('Oops! something went wrong...');
});

test('<Navigation /> renders progress indicator', () => {
    const user: IUser = { logins: [], current: { userName: '', canCreateRestaurant: false, orders: [] } };
    const navigation = enzyme.mount(
        <MemoryRouter>
            <Navigation
                hasError={false}
                isFetching={true}
                user={user}
                loggedInUser={user.current}
                checkout={jest.fn()}
                switchLogin={jest.fn()} />
        </MemoryRouter>);

    expect(navigation.find('LinearProgress').exists()).toBe(true);
});
