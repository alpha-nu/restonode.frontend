import * as React from 'react';
import { IRestaurant, IMeal } from '../../store';

export interface IMenuProps {
    fetchMeals: (restaurantId: number) => void;
    selectedRestaurant?: IRestaurant;
}

export default class Menu extends React.Component<IMenuProps> {

    componentDidMount() {
        this.props.fetchMeals!(this.props.selectedRestaurant!.id);
    }

    mealFragment = ({ id, name, description, price }: IMeal) => (
        <div className='meal' key={id}>
            <span className='meal-name'>{name}</span>
            <span className='meal-price'>{price}</span>
            <span className='meal-description'>{description}</span>
        </div>
    )

    public render() {
        return (
            <div>
                <h1 className='selected-restaurant-name'>
                    {this.props.selectedRestaurant!.name}
                </h1>
                <h2>Meals</h2>
                {this.props.selectedRestaurant!.meals && this.props.selectedRestaurant!.meals!.map(this.mealFragment)}
            </div>
        );
    }
}
