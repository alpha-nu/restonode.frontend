import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Restaurants, { IRestaurantsProps } from './restaurants';
import Navigation, { INotification } from './navigation';
import { IOrderProps } from './order';
import { ILoginsProps } from './logins';
import Menu, { IMenuProps } from './menu';
import Confirmation from './confirmation';

export default class App extends React.Component<ILoginsProps
    & IRestaurantsProps
    & IMenuProps
    & IOrderProps
    & INotification> {

    public render() {
        return (
            <div>
                <header>
                    <Navigation
                        user={this.props.user}
                        switchLogin={this.props.switchLogin}
                        loggedInUser={this.props.loggedInUser}
                        checkout={this.props.checkout}
                        isFetching={this.props.isFetching}
                        hasError={this.props.hasError}
                    />
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
                        <Route path='/order-confirmation'>
                            <Confirmation order={this.props.loggedInUser.confirmation!} />
                        </Route>
                    </Switch>
                </main>
            </div>
        );
    }
}
