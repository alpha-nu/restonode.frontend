import * as React from 'react';
import { ILogin } from '../../store';

export interface ILoginsProps {
    logins: ILogin[];
    switchLogin: (userName: string) => any;
}

export default class Logins extends React.Component<ILoginsProps> {
    public render() {
        return (
            <div>
                <ul>
                    {this.props.logins.map(_ => (
                        <li className='user-login'
                            key={_.userName}
                            onClick={() => this.props.switchLogin(_.userName)}
                        >
                            {_.userName}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
