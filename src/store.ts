import { createStore } from 'redux';

export interface IStoreState {
    userName: string;
}

const preLoadedState: IStoreState = {
    userName: 'anonymous'
};

export default createStore<IStoreState, any, any, {}>(
    (_: IStoreState) => _,
    preLoadedState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
