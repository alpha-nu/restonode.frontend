import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Logins from '.';

enzyme.configure({ adapter: new Adapter() });

test('<Logins/> renders a list of user logins', () => {
    const logins = shallow(<Logins />);
});
