
export default (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD_POINT':
            console.log(`${action.key}: ${action.value}`);
            return { ...state, [action.key]: action.value };
        case 'POINT_ADDED':
            return {
                ...state,
                point: action.payload
            };
        case 'POINTS_LOADED':
            return {
                ...state,
                points: action.payload,
            };
        case 'POINTS_RECALCULATED':
            return {
                ...state,
                points_r: action.payload,
                current_r: action.r
            };
    }

    return state;
};
