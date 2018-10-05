import * as React from 'react';
import { Route } from 'react-router-dom';
import Restaurants from './restaurants';
import Navigation from './navigation';
import Order from './order';

export default class App extends React.Component {
    public render() {
        return (
            <div>
                <header>
                    <Navigation />
                    <Order />
                </header>
                <main>
                    <Route path='/restaurants' component={Restaurants} />
                
                </main>
            </div>
        );
    }
}