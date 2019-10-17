import { createStore } from 'redux';
const initialAppState = {
    selectedPlayer: -1
};
export const reducer = (state = initialAppState, action) => {
    if (action.type === "SelectPlayer")
        return { ...state, selectedPlayer: action.selectedPlayer }
    return {...state, error: "action not defined"}
};
export const Store = createStore(reducer);