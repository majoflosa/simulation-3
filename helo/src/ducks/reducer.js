import axios from 'axios';

let initialState = {
    currentLocation: '/',
    
    registeredUser: {},
    registeringUser: false,

    authedUser: {},
    loadingAuthedUser: false,

    sessionUser: {},
    loadingSessionUser: false
};

const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export function setCurrentLocation( location ) {
    return {
        type: SET_CURRENT_LOCATION,
        payload: location
    };
}

const GET_LOGIN_USER = 'GET_LOGIN_USER';
export function getLoginUser( username, password ) {
    return {
        type: GET_LOGIN_USER,
        payload: axios.get( `/login/${username}/${password}` )
    };
}

const GET_SESSION_USER = 'GET_SESSIONN_USER';
export function getSessionUser() {
    return {
        type: GET_SESSION_USER,
        payload: axios.get( '/api/session-user/' )
    };
}

const REGISTER_USER = 'REGISTER_USER';
export function registerUser( reqBody ) {
    return {
        type: REGISTER_USER,
        payload: axios.post( '/api/register/', reqBody )
    };
}

export default function reducer( state = initialState, action ) {
    switch( action.type ) {
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload
            };

        case GET_LOGIN_USER + '_REJECTED':
            return state;
        case GET_LOGIN_USER + '_PENDING':
            // console.log( 'getAuthedUser pending' )
            return {
                ...state,
                loadingAuthedUser: true
            };
        case GET_LOGIN_USER + '_FULFILLED':
            // console.log( 'getAuthedUser fulfilled: ', action.payload.data[0] )
            return {
                ...state,
                authedUser: action.payload.data,
                loadingAuthedUser: false
            }

        case GET_SESSION_USER + '_REJECTED':
            return {...state};
        case GET_SESSION_USER + '_PENDING':
            return {
                ...state,
                loadingSessionUser: true
            };
        case GET_SESSION_USER + '_FULFILLED':
            return {
                ...state,
                sessionUser: action.payload.data
            };

        case REGISTER_USER + '_REJECTED':
            return state;
        case REGISTER_USER + '_PENDING':
            return {
                ...state,
                registeringUser: true
            };
        case REGISTER_USER + '_FULFILLED':
            return {
                ...state,
                registeringUser: false,
                registeredUser: action.payload
            };
            
        default:
            return state;
    }
}