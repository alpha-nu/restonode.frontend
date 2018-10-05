import './index.css';
import { createStore } from 'redux';
import { IStoreState } from './_';
import enthusiasmReducer from './reducers/_';
import { EnthusiasmAction } from './actions/_';

export const store = createStore<IStoreState, EnthusiasmAction, any, {}>(enthusiasmReducer, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript'
}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export interface IStoreState {
    languageName: string;
    enthusiasmLevel: number;
}

