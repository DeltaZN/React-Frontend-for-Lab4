import agent from './agent';

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        store.dispatch({ type: 'ASYNC_START', subtype: action.type });
        action.payload.then(
            res => {
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                action.error = true;
                action.payload = error.response.body;
                store.dispatch(action);
            }
        );

        return;
    }

    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

const localStorageMiddleware = store => next => action => {
    if (action.type === 'POINTS_LOADED') {
        if (action.error) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('username');
            agent.setToken(null);
        }
    }

    if (action.type === 'POINT_ADDED') {
        if (!action.error) {
            store.dispatch({ type: 'POINTS_LOADED', payload: agent.Points.all() });
            store.dispatch({ type: 'POINTS_RECALCULATED', payload: agent.Points.recalculated(action.r), r: action.r});
        }
    }

    if (action.type === 'LOGIN') {
        if (!action.error) {
            window.localStorage.setItem('token', action.payload.message);
            window.localStorage.setItem('username', action.username);
            agent.setToken(action.payload.message);
        }
    } else if (action.type === 'LOGOUT') {
        console.log('second test');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
        agent.setToken(null);
    }

    next(action);
};


export {
    localStorageMiddleware,
    promiseMiddleware
};
