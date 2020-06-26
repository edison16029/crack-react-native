import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5' ;
import { dimensions, colors, padding, fonts} from '../../styles/base';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

function AppBarComponent(props) {
    const size = dimensions.fullWidth * 0.07;
    const theme = useSelector(state => state.theme)
    return (
        <View style={styles.app_bar_container}>
            <TouchableOpacity>
                <Icon color={theme.colors.accent} name="cog" 
                    type="font-awesome" size={size} style={styles.app_bar_icons}
                    onPress = {props.onSettingsPress}/>
            </TouchableOpacity>

            <TouchableOpacity>
                <Icon color={theme.colors.accent} name="question-circle" 
                    type="font-awesome" size={size} style={styles.app_bar_icons}
                    onPress = {props.onHowToPlayPress}/>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    app_bar_container : {
        flex : 0.5,
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