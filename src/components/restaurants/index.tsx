import * as React from 'react';
import { IRestaurants, IRestaurant } from '../../store';
import { Link } from 'react-router-dom';

export interface IRestaurantsProps {
    restaurants: IRestaurants;
    fetchRestaurants: () => void;
    selectRestaurant: (id: number) => void;
}

export default class Restaurants extends React.Component<IRestaurantsProps> {

    componentDidMount() {
        this.props.fetchRestaurants();
    }

    renderRestaurantSegment = ({ id, name, rating, address }: IRestaurant) => (
        <div key={id}>
            <Link
                onClick={() => this.props.selectRestaurant(id)}
                className='restaurant-name'
                to={`/restaurants/${id}`}>{name}</Link>
            <span className='restaurant-rating'>{rating}</span>
            <span className='restaurant-address'>{address}</span>
        </div>
    );

    public render() {
        return (
            <div>
                <h2>Restaurants</h2>
                {this.props.restaurants.all.map(this.renderRestaurantSegment)}
            </div>
        );
    }
}
