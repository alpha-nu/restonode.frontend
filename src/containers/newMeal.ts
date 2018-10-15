import { connect } from 'react-redux';
import NewMeal from '../components/menu/new';
import { IStoreState } from '../store';
import { Dispatch } from 'redux';
import { RestonodeAction } from '../actions';
import { newMeal, ICreateMealAttributes } from '../actions/meal';

export const mapStateToProps = (state: IStoreState) => ({
    createdMeal: state.createdMeal,
    selectedRestaurant: state.restaurants.selected
});

export const mapDispatchToProps = (dispatch: Dispatch<RestonodeAction>) => ({
    newMeal: (restaurantId: number, mealAttributes: ICreateMealAttributes) =>
        newMeal(restaurantId, mealAttributes)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMeal);
