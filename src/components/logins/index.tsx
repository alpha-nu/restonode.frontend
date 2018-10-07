import * as React from 'react';
import { IUser } from '../../store';

export interface ILoginsProps {
    user: IUser;
    switchLogin: (userName: string) => any;
}

export default class Logins extends React.Component<ILoginsProps> {
    public render() {
        return (
            <div>
                <ul>
                    {this.props.user.logins.map(_ => (
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
