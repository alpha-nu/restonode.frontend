import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Restaurants, { IRestaurantsProps } from './restaurants';
import Navigation, { INotification } from './navigation';
import { IOrderProps } from './order';
import { ILoginsProps } from './logins';
import Menu, { IMenuProps } from './menu';
import Confirmation from './confirmation';
import NewRestaurant from '../containers/newRestaurant';
import NewMeal from '../containers/newMeal';

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
                                canCreateRestaurant={this.props.loggedInUser.canCreateRestaurant}
                                fetchRestaurants={this.props.fetchRestaurants}
                                restaurants={this.props.restaurants} />
                        </Route>
                        <Route path='/restaurants/new' component={NewRestaurant} />
                        <Route exact={true} path='/restaurants/:id/meals' render={({ match, history, location }) =>
                            <Menu
                                match={match}
                                history={history}
                                location={location}
                                canCreateRestaurant={this.props.loggedInUser.canCreateRestaurant}
                                selectRestaurant={this.props.selectRestaurant}
                                selectedRestaurant={this.props.selectedRestaurant}
                                addMeal={this.props.addMeal} />
                        }>
                        </Route>
                        <Route path='/restaurants/:id/meals/new' component={NewMeal} />
                        <Route path='/order-confirmation'>
                            <Confirmation order={this.props.loggedInUser.confirmation!} />
                        </Route>
                        <Redirect from='/' to='/restaurants' />
                    </Switch>
                </main>
            </div>
        );
    }
}
