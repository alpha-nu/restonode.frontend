import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Restaurants, { IRestaurantsProps } from './restaurants';
import Navigation from './navigation';
import Order from './order';
import { ILoginsProps } from './logins';
import Menu from './menu';

export default class App extends React.Component<ILoginsProps & IRestaurantsProps> {
    public render() {
        return (
            <div>
                <header>
                    <Navigation
                        user={this.props.user}
                        switchLogin={this.props.switchLogin}
                    />
                    <Order />
                </header>
                <main>
                    <Switch>
                        <Route exact={true} path='/restaurants' >
                            <Restaurants
                                fetchRestaurants={this.props.fetchRestaurants}
                                restaurants={this.props.restaurants}
                                selectRestaurant={this.props.selectRestaurant}
                                 />
                        </Route>
                        <Route path='/restaurants/:id' render={(params) => {
                            return (<Menu {...params} selectedRestaurant={this.props.restaurants.selected!} />); }} />
                    </Switch>
                </main>
            </div>
        );
    }
}
