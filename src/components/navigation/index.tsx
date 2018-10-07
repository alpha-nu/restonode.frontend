import * as React from 'react';
import Logins, { ILoginsProps } from '../logins';

export default class Navigation extends React.Component<ILoginsProps> {
    public render() {
        return (
            <div>
                <h1>restonode.ui</h1>
                <Logins user={this.props.user} switchLogin={this.props.switchLogin} />
            </div>
        );
    }
}
