import { IStoreState } from '../_';
import { EnthusiasmAction, INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM, FETCH_LANGUAGE_SUCCESS } from '../actions/_';

export default (state: IStoreState, action: EnthusiasmAction): IStoreState => {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
        case DECREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: state.enthusiasmLevel - 1 };
        case FETCH_LANGUAGE_SUCCESS:
            return { ...state, languageName: action.payload };
        default:
            return state;
    }
};
