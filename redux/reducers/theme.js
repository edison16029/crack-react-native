import { SET_THEME, SET_COLORS, SET_SOUND, SET_VIBRATE } from '../actionTypes';
import { darkTheme } from '../../styles/themes';

const initialState = darkTheme

const theme = (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME : {
            return action.payload;
        }

        case SET_COLORS : {
            return {...state, colors : action.payload};
        }

        case SET_SOUND : {
            return {...state, sound : action.payload};
        }

        case SET_VIBRATE : {
            return {...state, vibrate : action.payload};
        }
        default : {
            return state;
        }
    }
};

export default theme;