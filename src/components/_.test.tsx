import * as React from 'react';
import * as enzyme from 'enzyme';
import { shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { Hello } from './_';

enzyme.configure({ adapter: new Adapter() });

test('<Hello/> renders correct enthusiasm level', () => {
    const hello = shallow(<Hello name='AnKai' enthusiasmLevel={3} fetchLanguage={jest.fn()} />);
    expect(hello.find('.hello-greeting').text()).toEqual('Hello AnKai!!!');
});

test('<Hello/> renders motivational message when enthusiasm level is <= 0', () => {
    const hello = shallow(<Hello name='' enthusiasmLevel={0} fetchLanguage={jest.fn()} />);

    expect(hello.find('.hello-error').text()).toEqual('You could be a little more enthusiastic');
});
