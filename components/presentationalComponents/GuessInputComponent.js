import React, {Component} from 'react'
import {TextInput, Button, View, StyleSheet} from 'react-native'
import  Icon from 'react-native-vector-icons/FontAwesome5'
// import Icon from '../CustomIconComponent'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import * as BaseStyles from '../../styles/base'

function GuessInputComponent(props)  {
    const {input, handleChangeText, handleGuessButtonPress} = props;
    const theme = useSelector(state => state.theme);

    const textInput = StyleSheet.flatten([
        styles.textInput, 
        {backgroundColor : theme.colors.primaryDark, 
        color : theme.colors.accent}
    ])
    const guessButton = StyleSheet.flatten([
        styles.guessButton, 
        {backgroundColor : theme.colors.primary,
        borderColor : theme.colors.accent}
    ])
    const guessButtonIcon = {color : theme.colors.accent}
    const iconSize = BaseStyles.dimensions.fullWidth * 0.06

    return (
        <View style = {styles.container}>
            <TextInput 
                value={input} onChangeText = {handleChangeText} style = {textInput}
                placeholder = ". . . ." autoCapitalize = {'characters'} maxLength = {4} />
             
            <TouchableOpacity style = {guessButton} onPress = {handleGuessButtonPress}>
                <Icon style = {guessButtonIcon} size = {iconSize} name = "arrow-up" type = "font-awesome"/>
                {/* <Icon style = {guessButtonIcon} size = {iconSize} name = "bullseye" /> */}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    textInput : {
        width : BaseStyles.dimensions.fullWidth * 0.33,
        height : BaseStyles.dimensions.fullHeight * 0.07,
        marginRight : BaseStyles.padding.md,
        textAlign : 'center',
        fontFamily : BaseStyles.fonts.primary,
        fontSize : BaseStyles.dimensions.fullWidth * 0.33 * 0.2,
        borderRadius : BaseStyles.borderRadius.radiusSm,
        elevation : 5,
    },
    guessButton : {
        width : BaseStyles.dimensions.fullWidth * 0.11,
        height : BaseStyles.dimensions.fullWidth * 0.11,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : (BaseStyles.dimensions.fullWidth*0.11)/2,
        borderWidth : 2.5,
        elevation : 5,
    },
});

GuessInputComponent.propTypes = {
    input : PropTypes.string.isRequired,
    handleChangeText : PropTypes.func.isRequired,
    handleGuessButtonPress : PropTypes.func.isRequired,
}

export default GuessInputComponent;