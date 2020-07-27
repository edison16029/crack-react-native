import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5' ;
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

function AppBarGameComponent(props) {
    // console.log("[ AppBarGameComponent.js] props : ",props)
    const {handleExitButtonPress,handleSurrenderButtonPress, isSurrenderShown,onHowToPlayPress} = props
    const theme = useSelector(state => state.theme)

    const iconSize = BaseStyles.dimensions.fullWidth * 0.07

    const surrenderFlag = () => {
        if(!isSurrenderShown){
            <></>
        }
        else{
            return (

                <TouchableOpacity onPress = {handleSurrenderButtonPress}>
                    <Icon color={theme.colors.accent} name="flag" 
                        type="font-awesome" size={iconSize} style={styles.app_bar_icons}/>
                </TouchableOpacity>

            )
        }
    }
    return (
        <View style={styles.app_bar_container}>
            
            <TouchableOpacity onPress = {handleExitButtonPress}>
                <Icon color={theme.colors.accent} name="times-circle" 
                    type="font-awesome" size={iconSize} style={styles.app_bar_icons}/>
            </TouchableOpacity>
            <View style={styles.right_top_container}>
                
                <TouchableOpacity onPress = {onHowToPlayPress}>
                    <Icon color={theme.colors.accent} name="question-circle" 
                        type="font-awesome" size={iconSize} style={styles.app_bar_icons} />
                        
                </TouchableOpacity>

                {surrenderFlag()}
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    app_bar_container : {
        flexDirection : 'row',
        padding : BaseStyles.padding.sm,
        justifyContent : 'space-between'
    },
    app_bar_icons : {
        paddingTop : BaseStyles.padding.sm,
        paddingLeft: BaseStyles.padding.sm
    },
    right_top_container : {
        flexDirection : 'row',
        paddingRight : BaseStyles.padding.sm
    }
})

export default AppBarGameComponent;