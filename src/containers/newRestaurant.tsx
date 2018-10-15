import { connect } from 'react-redux';
import NewRestaurant from '../components/restaurants/new';
import { IStoreState } from '../store';
import { RestonodeAction } from '../actions';
import { Dispatch } from 'redux';
import { newRestaurant, ICreateRestaurantAttributes, initNewRestaurant } from '../actions/restaurant';

export const mapStateToProps = (state: IStoreState) => ({
    createdRestaurant: state.createdRestaurant,
    owner: state.user.current.userName
});

export const mapDispatchToProps = (dispatch: Dispatch<RestonodeAction>) => ({
    newRestaurant: (restaurant: ICreateRestaurantAttributes) => newRestaurant(restaurant)(dispatch),
    initNewRestaurant: () => dispatch(initNewRestaurant())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurant);
