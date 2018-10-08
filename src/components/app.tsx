import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Restaurants, { IRestaurantsProps } from './restaurants';
import Navigation from './navigation';
import Order, { IOrderProps } from './order';
import { ILoginsProps } from './logins';
import Menu, { IMenuProps } from './menu';

export default class App extends React.Component<ILoginsProps
    & IRestaurantsProps
    & IMenuProps
    & IOrderProps> {
    public render() {
        return (
            <div>
                <header>
                    <Navigation
                        user={this.props.user}
                        switchLogin={this.props.switchLogin}
                    />
                    <Order loggedInUser={this.props.user.current} checkout={this.props.checkout} />
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
                        <Route path='/restaurants/:id'>
                            <Menu
                                fetchMeals={this.props.fetchMeals}
                                selectedRestaurant={this.props.restaurants.selected!}
                                addMeal={this.props.addMeal} />
                        </Route>
                    </Switch>
                </main>
            </div>
        );
    }
}
