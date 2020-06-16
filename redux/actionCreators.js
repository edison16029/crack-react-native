import * as ActionTypes from './actionTypes';

/*
// A sample Thunk to call an action 
export const thunk = (params) => (dispatch) => {
    dispatch(action(params));
}
*/

export const setTheme = (theme) => ({
    type : ActionTypes.SET_THEME,
    payload : theme
})