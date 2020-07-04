import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as BaseStyles from '../../styles/base'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import CustomIcon from '../CustomIconComponent'
import  Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'

function WinnerScreenComponent(props) {
    const {guess, handleHomeButtonPress, handleRestartButtonPress, isSurrender} = props
    const theme = useSelector(state => state.theme)
    const cardContainer = StyleSheet.flatten([
        styles.cardContainer,
        {backgroundColor : theme.colors.primaryDark}

    ])
    const font = StyleSheet.flatten([
        styles.font,
        {color : theme.colors.accent}
    ])
    const iconButton = StyleSheet.flatten([
        styles.iconButton,
        {borderColor : theme.colors.accent,
        backgroundColor : theme.colors.primary,},
    ])
    const iconSize = BaseStyles.dimensions.fullWidth * 0.06
    const iconStyle = {color : theme.colors.accent}
    const bannerSize = BaseStyles.dimensions.fullWidth * 0.26
    console.log("[WinnerScreenComponent.js] Target word guessed")

    const banner = () => {
        if(isSurrender){
            return (
                //Change this to surrender icon
                <CustomIcon name = {"logo"} size = {96} style = {iconStyle}/>
            )
        }
        else{
            return (
                <CustomIcon name = {"banner"} size = {96} style = {iconStyle}/>
            )
        }
    }
        

    return (
        <View style = {cardContainer}>
            <Text style = {font}>{guess}</Text>
            {banner()}
            <View style = {styles.iconRow} >
                <TouchableOpacity style = {iconButton} onPress = {handleHomeButtonPress}>
                    <Icon name = "home" type = "font-awesome" size = {iconSize} style = {iconStyle} />
                </TouchableOpacity>
                <TouchableOpacity style = {iconButton} onPress = {handleRestartButtonPress}>
                    <Icon name = "redo" type = "font-awesome" size = {iconSize} style = {iconStyle} /> 
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer : {
        flex : 3,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : BaseStyles.margin.sm,
        marginBottom : BaseStyles.margin.md,
        marginHorizontal : BaseStyles.margin.xl,
        borderRadius : BaseStyles.borderRadius.radiusLg,
        elevation : 5,    
    },
    font : {
        fontSize : BaseStyles.fonts.lg,
        fontFamily : BaseStyles.fonts.primary,
        textAlign : 'center',
        textTransform : 'uppercase'
    },
    iconRow : { 
        width : `60%`, 
        flexDirection : 'row', 
        justifyContent : 'space-around', 
        alignItems : 'center',
    },
    iconButton : {
        width : BaseStyles.dimensions.fullWidth * 0.11,
        height : BaseStyles.dimensions.fullWidth * 0.11,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : (BaseStyles.dimensions.fullWidth*0.11)/2,
        borderWidth : 2.5,
        elevation : 5,
    },
});


WinnerScreenComponent.propTypes = {
    guess : PropTypes.string.isRequired,
    handleHomeButtonPress : PropTypes.func.isRequired,
    handleRestartButtonPress : PropTypes.func.isRequired,
}

export default WinnerScreenComponent;