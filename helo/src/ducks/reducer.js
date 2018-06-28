let initialState = {
    currentLocation: '/'
};

const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export function setCurrentLocation( location ) {
    return {
        type: SET_CURRENT_LOCATION,
        payload: location
    };
}

export default function reducer( state = initialState, action ) {
    switch( action.type ) {
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload
            };
            
        default:
            return state;
    }
}