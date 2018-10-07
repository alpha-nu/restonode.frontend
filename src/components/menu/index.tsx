import * as React from 'react';
import { IRestaurant } from '../../store';
import { RouteComponentProps } from 'react-router';

interface IRestaurantParams {
    id: string;
}

export interface IMenuProps {
    fetchMeals?: (restaurantId: number) => void;
    selectedRestaurant: IRestaurant;
}

export default class Menu extends React.Component<IMenuProps & RouteComponentProps<IRestaurantParams>> {

    componentDidMount() {
        // this.props.fetchMeals();
    }

    public render() {
        return (
            <div>
                {this.props.match.params.id}
                <h1>{this.props.selectedRestaurant && this.props.selectedRestaurant.name}</h1>
                <h2>Meals</h2>
                {this.props.selectedRestaurant && this.props.selectedRestaurant.meals!.map(_ => (
                    <div key={_.id}>
                        <h3>{_.name} ({_.price})</h3>
                        <i>{_.description}</i>
                    </div>
                ))}
            </div>
        );
    }
}
