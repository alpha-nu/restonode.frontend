import { connect } from 'react-redux';
import App from '../components/app';
import { IStoreState, IMeal } from '../store';
import { Dispatch } from 'redux';
import { RestonodeAction } from '../actions';
import { switchLogin } from '../actions/login';
import { fetchRestaurants, selectRestaurant } from '../actions/restaurant';
import { fetchMeals, addMeal } from '../actions/meal';

export const mapStateToProps = (state: IStoreState) => ({
    user: state.user,
    restaurants: state.restaurants,
    loggedInUser: state.user.current
});

export const mapDispatchToProps = (dispatch: Dispatch<RestonodeAction>) => ({
    switchLogin: (userName: string) => dispatch(switchLogin(userName)),
    fetchRestaurants: () => fetchRestaurants()(dispatch),
    selectRestaurant: (id: number) => dispatch(selectRestaurant(id)),
    fetchMeals: (restaurantId: number) => fetchMeals(restaurantId)(dispatch),
    addMeal: (meal: IMeal) => dispatch(addMeal(meal))
});

export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(App);
