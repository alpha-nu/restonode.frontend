import { connect } from 'react-redux';
import { Hello, IHelloProps } from '../components/_';
import { IStoreState } from '../_';
import { Dispatch } from 'redux';
import { EnthusiasmAction, incrementEnthusiasm, decrementEnthusiasm, fetchLanguage } from '../actions/_';

const mapStateToProps = ({ languageName, enthusiasmLevel }: IStoreState): IHelloProps => (
    { name: languageName, enthusiasmLevel }
);

const mapDispatchToProps = (dispatch: Dispatch<EnthusiasmAction>) => ({
    increment: () => dispatch(incrementEnthusiasm()),
    decrement: () => dispatch(decrementEnthusiasm()),
    fetchLanguage: (language: string) => fetchLanguage(language)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Hello);