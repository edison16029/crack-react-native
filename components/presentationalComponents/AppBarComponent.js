import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5' ;
import { dimensions, colors, padding, fonts} from '../../styles/base';
import { useSelector } from 'react-redux';

function AppBarComponent(props) {
    const size = dimensions.fullWidth * 0.07;
    const theme = useSelector(state => state.theme)
    return (
        <View style={styles.app_bar_container}>
            <Icon color={theme.colors.accent} name="cog" 
                type="font-awesome" size={size} style={styles.app_bar_icons}
                onPress = {props.onSettingsPress}/>
            <Icon color={theme.colors.accent} name="question-circle" 
                type="font-awesome" size={size} style={styles.app_bar_icons}
                onPress = {props.onHowToPlayPress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    app_bar_container : {
        flex : 0.1,
        flexDirection : 'row-reverse',
        alignItems : 'flex-start',
        padding : padding.sm,
        width : "100%"
    },
    app_bar_icons : {
        paddingVertical : padding.sm,
        paddingRight : padding.sm
    },
})

export default AppBarComponent;