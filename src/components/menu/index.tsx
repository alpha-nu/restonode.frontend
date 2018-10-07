import * as React from 'react';
import { IRestaurant, IMeal } from '../../store';
import { RouteComponentProps } from 'react-router';

interface IRestaurantParams {
    id: string;
}

export interface IMenuProps {
    fetchMeals?: (restaurantId: number) => void;
    selectedRestaurant?: IRestaurant;
}

export default class Menu extends React.Component<IMenuProps & RouteComponentProps<IRestaurantParams>> {

    componentDidMount() {
        this.props.fetchMeals!(this.props.selectedRestaurant!.id);
    }

    mealFragment = ({id, name, description, price}: IMeal) => (
        <div key={id}>
            <h3>{name} ({price})</h3>
            <i>{description}</i>
        </div>
    )

    public render() {
        return (
            <div>
                <h1>{this.props.selectedRestaurant!.name}</h1>
                <h2>Meals</h2>
                {this.props.selectedRestaurant!.meals && this.props.selectedRestaurant!.meals!.map(this.mealFragment)}
            </div>
        );
    }
}
