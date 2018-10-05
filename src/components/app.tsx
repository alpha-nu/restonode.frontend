import * as React from 'react';
import { Route } from 'react-router-dom';
import Restaurants from './restaurant';
import Navigation from './navigation';
import Order from './order';
import { ILoginsProps } from './logins';

export default class App extends React.Component<ILoginsProps> {
    public render() {
        return (
            <div>
                <header>
                    <Navigation
                        logins={this.props.logins}
                        switchLogin={this.props.switchLogin}
                    />
                    <Order />
                </header>
                <main>
                    <Route path='/restaurants' component={Restaurants} />
                </main>
            </div>
        );
    }
}
