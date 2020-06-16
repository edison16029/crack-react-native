import { SET_THEME } from '../actionTypes';
import { darkTheme } from '../../styles/themes';

const initialState = darkTheme

const theme = (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME : {
            return action.payload;
        }

        default : {
            return state;
        }
    }
};

export default theme;