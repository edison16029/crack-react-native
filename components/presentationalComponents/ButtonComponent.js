import * as React from 'react';
import { Text,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';

function ButtonComponent(props) {
    const theme = useSelector( state => state.theme);
    const { onPress } = props;
    return (
        <TouchableOpacity
          onPress =  {onPress}
          style={[styles.play_button_container,{backgroundColor : theme.colors.primaryDark}]}>
            <Text style={[styles.button_text,{color : theme.colors.accent}]}>PLAY</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    play_button_container  : {
        backgroundColor : BaseStyles.defaultColors.primaryDark,
        borderRadius : 20,
        alignItems : 'center',
        justifyContent : 'center',
        width : BaseStyles.dimensions.fullWidth * 0.40,
        height : BaseStyles.dimensions.fullWidth * 0.20,
        marginBottom : BaseStyles.padding.sm,
        elevation : 10
    },
    button_text : {
        color : BaseStyles.defaultColors.accent,
        fontSize : BaseStyles.dimensions.fullWidth * 0.40 * 0.15,
        fontFamily : 'serif'
    },
})

export default ButtonComponent;