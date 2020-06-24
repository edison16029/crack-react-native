import * as React from 'react';
import { View } from 'react-native';
import SinglePlayerGameComponent from './SinglePlayerGameComponent';
import { useSelector } from 'react-redux';

function GameComponent(props) {
    const theme = useSelector(state => state.theme);
    const containerStyle = {
        flex : 1,
        backgroundColor : theme.colors.primary,
    }
    return (
        <View style={containerStyle}>
            <SinglePlayerGameComponent navigation = {props.navigation}/>
        </View>
    );
}

export default GameComponent;