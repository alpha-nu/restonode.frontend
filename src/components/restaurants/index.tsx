import * as React from 'react';
import { IRestaurant } from '../../store';

export interface IRestaurantsProps {
    restaurants: IRestaurant[];
    fetchRestaurants: () => void;
}

export default class Restaurants extends React.Component<IRestaurantsProps> {

    componentDidMount() {
        this.props.fetchRestaurants();
    }

    public render() {
        return (
            <div>
                <h2>Restaurants</h2>
                {this.props.restaurants.map(_ => (
                    <div key={_.id}>
                        <h3>{_.name} ({_.rating})</h3>
                        <h4>{_.address}</h4>
                    </div>
                ))}
            </div>
        );
    }
}
