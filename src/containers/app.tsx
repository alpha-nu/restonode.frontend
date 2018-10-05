import { connect } from 'react-redux';
import App from '../components/app';
import { IStoreState } from '../store';
import { Dispatch } from 'redux';
import { OrderAction } from '../actions';
import { switchLogin } from '../actions/switchLogin';

export const mapStateToProps = (state: IStoreState) => ({
    logins: state.logins
});

export const mapDispatchToProps = (dispatch: Dispatch<OrderAction>) => ({
    switchLogin: (userName: string) => dispatch(switchLogin(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
