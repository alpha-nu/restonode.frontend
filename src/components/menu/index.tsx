import * as React from 'react';
import { IRestaurant, IMeal } from '../../store';

export interface IMenuProps {
    fetchMeals: (restaurantId: number) => void;
    selectedRestaurant?: IRestaurant;
    addMeal: (meal: IMeal) => void;
}

export default class Menu extends React.Component<IMenuProps> {

    componentDidMount() {
        this.props.fetchMeals!(this.props.selectedRestaurant!.id);
    }

    mealFragment = (meal: IMeal) => (
        <div className='meal' key={meal.id}>
            <span className='meal-name'>{meal.name}</span>
            <span className='meal-price'>{meal.price}</span>
            <span className='meal-description'>{meal.description}</span>
            <button
                className='add-meal'
                onClick={() => this.props.addMeal(meal)} >+</button>
        </div>
    );

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
