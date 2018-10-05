import { Dispatch } from 'redux';

export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;

export const FETCH_LANGUAGE_REQUEST = 'FETCH_LANGUAGE_REQUEST';
export type FETCH_LANGUAGE_REQUEST = typeof FETCH_LANGUAGE_REQUEST;

export const FETCH_LANGUAGE_SUCCESS = 'FETCH_LANGUAGE_SUCCESS';
export type FETCH_LANGUAGE_SUCCESS = typeof FETCH_LANGUAGE_SUCCESS;

export const FETCH_LANGUAGE_FAILURE = 'FETCH_LANGUAGE_FAILURE';
export type FETCH_LANGUAGE_FAILURE = typeof FETCH_LANGUAGE_FAILURE;

export interface IIncrementEnthusiasm {
    type: INCREMENT_ENTHUSIASM;
}

export interface IDecrementEnthusiasm {
    type: DECREMENT_ENTHUSIASM;
}

export interface IFetchLanguageRequest {
    type: FETCH_LANGUAGE_REQUEST,
    payload: string
}

export interface IFetchLanguageSuccess {
    type: FETCH_LANGUAGE_SUCCESS,
    payload: string
}

export interface IFetchLanguageFailure {
    type: FETCH_LANGUAGE_FAILURE,
    payload: string
}

export type EnthusiasmAction =
    IIncrementEnthusiasm
    | IDecrementEnthusiasm
    | IFetchLanguageRequest
    | IFetchLanguageSuccess
    | IFetchLanguageFailure;

export const incrementEnthusiasm = (): IIncrementEnthusiasm => ({ type: INCREMENT_ENTHUSIASM });
export const decrementEnthusiasm = (): IDecrementEnthusiasm => ({ type: DECREMENT_ENTHUSIASM });
export const fetchLanguageSuccess = (language: string): IFetchLanguageSuccess => (
    {
        type: FETCH_LANGUAGE_SUCCESS,
        payload: `**${language}**`
    }
);

export const fetchLanguage = (language: string) => {
    return async (dispatch: Dispatch<EnthusiasmAction>) => {
        dispatch<IFetchLanguageRequest>({ type: FETCH_LANGUAGE_REQUEST, payload: language });

        const result = await Promise.resolve('hello');
        await dispatch<IFetchLanguageSuccess>(fetchLanguageSuccess(result));
    }
};