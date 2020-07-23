import React, {useState} from 'react'
import {TextInput, Button, View, StyleSheet} from 'react-native'
import  Icon from 'react-native-vector-icons/FontAwesome5'
import SoundAndVibrate from '../../shared/SoundAndVibrate'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import * as BaseStyles from '../../styles/base'
import KeyboardComponent from './KeyboardComponent'

function GuessInputComponent(props)  {
    const {handleGuessButtonPress} = props;
    const theme = useSelector(state => state.theme)
    const [keyboardInput, setKeyboardInput] = useState("")

    const isGuessButtonDisabled = keyboardInput.length < 4 ? true : false
    const guessButtonColour = isGuessButtonDisabled ? theme.colors.primary : theme.colors.accent
    const textInput = StyleSheet.flatten([
        styles.textInput, 
        {backgroundColor : theme.colors.primaryDark, 
        color : theme.colors.accent}
    ])
        
    const guessButton = StyleSheet.flatten([
        styles.guessButton, 
        {backgroundColor : theme.colors.primaryDark,
        borderColor : isGuessButtonDisabled ? theme.colors.primary: theme.colors.accent,
        elevation : isGuessButtonDisabled ? 0 : 5}
    ])
    const guessButtonIcon = {color : guessButtonColour}
    const iconSize = BaseStyles.dimensions.fullWidth * 0.07

    const handleKeyPress = (key) => {
        console.log(" [GuessInputComponent.js] " + "Key : ",key )
        SoundAndVibrate.play('keyPress', theme.sound)
        setKeyboardInput(keyboardInput + key)
    }

    const handleBackspacePress = () => {
        SoundAndVibrate.play('keyPress', theme.sound)
        setKeyboardInput(keyboardInput.slice(0,-1))
    }


    return (
        <View style = {{flex : 4}} >
            <View style = {styles.rowContainer}>
                <TextInput 
                    value={keyboardInput} style = {textInput} maxLength = {4} editable = {false}
                    placeholder = ". . . ." autoCapitalize = {'characters'} placeholderTextColor = {theme.colors.accent} />

                <TouchableOpacity style = {guessButton} 
                    onPress = {() => { setKeyboardInput(""), handleGuessButtonPress(keyboardInput)}} 
                    disabled = {isGuessButtonDisabled}>
                    <Icon style = {guessButtonIcon} size = {iconSize} name = "arrow-up" type = "font-awesome"/>
                </TouchableOpacity>
            </View>
            <KeyboardComponent 
                input = {keyboardInput}
                onKeyPress = {handleKeyPress}
                onBackspacePress = {handleBackspacePress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        paddingTop : BaseStyles.margin.md,
    },
    textInput : {
        width : BaseStyles.dimensions.fullWidth * 0.33,
        height : BaseStyles.dimensions.fullHeight * 0.07,
        marginRight : BaseStyles.padding.md,
        textAlign : 'center',
        fontFamily : BaseStyles.fonts.primary,
        fontSize : BaseStyles.dimensions.fullWidth * 0.33 * 0.2,
        borderRadius : BaseStyles.borderRadius.radiusLg,
        elevation : 5,
    },
    guessButton : {
        width : BaseStyles.dimensions.fullWidth * 0.11,
        height : BaseStyles.dimensions.fullWidth * 0.11,
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : (BaseStyles.dimensions.fullWidth*0.11)/2,
        borderWidth : 1.5,
        elevation : 5,
    },
});

GuessInputComponent.propTypes = {
    handleGuessButtonPress : PropTypes.func.isRequired,
}

export default GuessInputComponent;