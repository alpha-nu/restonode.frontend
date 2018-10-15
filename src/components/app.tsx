import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Restaurants, { IRestaurantsProps } from './restaurants';
import Navigation, { INotification } from './navigation';
import { IOrderProps } from './order';
import { ILoginsProps } from './logins';
import Menu, { IMenuProps } from './menu';
import Confirmation from './confirmation';
import NewRestaurant from '../containers/newRestaurant';

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
                        <Route path='/restaurants/:id' render={({ match, history, location }) =>
                            <Menu
                                match={match}
                                history={history}
                                location={location}
                                selectRestaurant={this.props.selectRestaurant}
                                selectedRestaurant={this.props.selectedRestaurant}
                                addMeal={this.props.addMeal} />
                        }>
                        </Route>
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
