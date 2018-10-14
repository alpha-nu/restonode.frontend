import { connect } from 'react-redux';
import NewRestaurant from '../components/restaurants/new';
import { IStoreState } from '../store';
import { RestonodeAction } from '../actions';
import { Dispatch } from 'redux';
import { newRestaurant, ICreateRestaurantAttributes } from '../actions/restaurant';

export const mapStateToProps = (state: IStoreState) => ({
    createdRestaurant: state.createdRestaurant,
    owner: state.user.current.userName
});

export const mapDispatchToProps = (dispatch: Dispatch<RestonodeAction>) => ({
    newRestaurant: (restaurant: ICreateRestaurantAttributes) => newRestaurant(restaurant)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurant);
