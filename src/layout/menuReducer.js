import ActionTypes from '../constants/ActionTypes';

export default function menuReducer(state = {}, action) {
    switch (action.type) {
        case ActionTypes.SetActiveItem:
            return {
                ...state,
                activeItem: action.activeItem
            };
        default:
            return state;
    }
}
