/**
 *
 * @flow
 */
'use strict';

import type {Action} from '../actions/types';

export type User = {
    id: number;
    name: string;
    username: string;
    score: number;
    teamId?: number;
    email?: string;
    address?: string;
}

export type Login = {
    username: string;
    password: string;
}

type State = {
    isLoggedIn: boolean;
    details: User;
}

const initialState: State = {
    isLoggedIn: false,
    details: {
        id: -1,
        name: 'initialState',
        username: 'initialState',
        score: 0,
        teamId: -1,
        email: 'initialState',
        address: 'initialState'
    }
};

export default function user(state: State = initialState, action: Action): State {
    switch (action.type) {

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                isLoggedIn: true
            };

        case 'LOGIN_REQUEST':
            return {
                ...state,
                details: {
                    ...state.details,
                    username: action.form.username
                }
            };

        case 'LOGIN_RESPONSE':
            return {
                ...state,
                isLoggedIn: action.isValid,
                details: {
                    ...state.details,
                    username: action.isValid ? state.details.username : initialState.details.username
                }
            };

        case 'SIGNUP_FAIL':
        case 'CHECK_USERNAME_FAIL':
        case 'LOGIN_FAIL':
            console.error(action.error);
            return state;

        default:
            return state;
    }
}
