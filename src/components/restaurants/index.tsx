import * as React from 'react';
import { IRestaurants } from '../../store';
import { Link } from 'react-router-dom';

export interface IRestaurantsProps {
    restaurants: IRestaurants;
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
                {this.props.restaurants.all.map(_ => (
                    <div key={_.id}>
                        <h3>
                            <Link to={`/restaurants/${_.id}`}>
                                {_.name}
                            </Link>
                            ({_.rating})
                        </h3>
                        <h4>{_.address}</h4>
                    </div>
                ))}
            </div>
        );
    }
}
