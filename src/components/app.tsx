import * as React from 'react';
import { Route } from 'react-router-dom';
import Restaurants, { IRestaurantsProps } from './restaurants';
import Navigation from './navigation';
import Order from './order';
import { ILoginsProps } from './logins';

export default class App extends React.Component<ILoginsProps & IRestaurantsProps> {
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
                    <Route path='/restaurants' >
                        <Restaurants
                            fetchRestaurants={this.props.fetchRestaurants}
                            restaurants={this.props.restaurants} />
                    </Route>
                </main>
            </div>
        );
    }
}
