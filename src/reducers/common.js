const defaultState = {
    appName: 'Lab4-Web',
    token: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'APP_LOAD':
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.username || null
            };
        case 'REDIRECT':
            return { ...state, redirectTo: null };
        case 'LOGOUT':
            return { ...state, redirectTo: '/', token: null, currentUser: null };
        case 'LOGIN':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.username || null
            };
        case 'REGISTER':
            return {
                ...state,
                redirectTo: action.error ? null : '/login'
            };
    }
    return state;
};
