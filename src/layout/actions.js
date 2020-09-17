import ActionTypes from '../constants/ActionTypes';

export function setActiveItem(activeItem) {
    return {
        type: ActionTypes.SetActiveItem,
        activeItem
    };
}
