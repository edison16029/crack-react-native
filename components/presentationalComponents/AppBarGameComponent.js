import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5' ;
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

function AppBarGameComponent(props) {
    const {handleExitButtonPress,handleSurrenderButtonPress} = props
    const theme = useSelector(state => state.theme)

    const iconSize = BaseStyles.dimensions.fullWidth * 0.07
    return (
        <View style={styles.app_bar_container}>
            <TouchableOpacity onPress = {handleExitButtonPress}>
                <Icon color={theme.colors.accent} name="times-circle" 
                    type="font-awesome" size={iconSize} style={styles.app_bar_icons}/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {handleSurrenderButtonPress}>
                <Icon color={theme.colors.accent} name="flag" 
                    type="font-awesome" size={iconSize} style={styles.app_bar_icons}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    app_bar_container : {
        flexDirection : 'row',
        margin : BaseStyles.margin.sm,
        justifyContent : 'space-between'
    },
    app_bar_icons : {
        paddingTop : BaseStyles.padding.sm,
        paddingHorizontal : BaseStyles.padding.sm
    },
})

export default AppBarGameComponent;