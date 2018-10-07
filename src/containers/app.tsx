import { connect } from 'react-redux';
import App from '../components/app';
import { IStoreState } from '../store';
import { Dispatch } from 'redux';
import { RestonodeAction } from '../actions';
import { switchLogin } from '../actions/login';
import { fetchRestaurants } from '../actions/restaurant';

export const mapStateToProps = (state: IStoreState) => ({
    user: state.user,
    restaurants: state.restaurants
});

export const mapDispatchToProps = (dispatch: Dispatch<RestonodeAction>) => ({
    switchLogin: (userName: string) => dispatch(switchLogin(userName)),
    fetchRestaurants: () => fetchRestaurants()(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(App);
