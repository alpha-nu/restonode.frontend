import * as React from 'react';
import { ILogin } from '../../store';

export interface IOrderProps {
    loggedInUser: ILogin;
}

export default class Order extends React.Component<IOrderProps> {
    public render() {
        return (
            <div>
                <h2>online order</h2>
            </div>
        );
    }
}
