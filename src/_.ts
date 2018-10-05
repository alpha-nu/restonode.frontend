import './index.css';
import { createStore } from 'redux';
import enthusiasmReducer from './reducers/_';
import { EnthusiasmAction } from './actions/_';

export interface IStoreState {
  languageName: string;
  enthusiasmLevel: number;
}

export const store = createStore<IStoreState, EnthusiasmAction, any, any>(enthusiasmReducer, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript'
}, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());
