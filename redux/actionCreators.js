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

export const setColors= (colors) => ({
    type : ActionTypes.SET_COLORS,
    payload : colors
})

export const setSound = (value) => ({
    type : ActionTypes.SET_SOUND,
    payload : value
})

export const setVibrate = (value) => ({
    type : ActionTypes.SET_VIBRATE,
    payload : value
})