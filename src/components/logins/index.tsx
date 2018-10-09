import * as React from 'react';
import { IUser } from '../../store';
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

export interface ILoginsProps {
    user: IUser;
    switchLogin: (userName: string) => any;
}

export default class Logins extends React.Component<ILoginsProps> {
    public render() {
        return (
            <div>
                {this.props.user.logins.map(_ => (
                    <MenuItem key={_.userName} onClick={() => this.props.switchLogin(_.userName)}>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText className='user-login' inset primary={_.userName} />
                    </MenuItem>
                ))}
            </div>
        );
    }
}
