import * as React from 'react';
import { View,Text, FlatList,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5'
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';


function KeyboardComponent(props) {
    
    const theme = useSelector( state => state.theme);
    const renderLetter = ({item}) => {
        var disabled = props.input.includes(item) || props.input.length >= 4
        var disabledStyle = props.input.includes(item)
        if(item !== '0') {
            return (
                <TouchableOpacity
                    disabled = {disabled}
                    onPress = { () =>  props.onKeyPress(item) }    
                    style={[styles.button_container,{backgroundColor : theme.colors.primaryDark, borderColor : disabledStyle ? theme.colors.primary : theme.colors.accent, elevation : disabledStyle ? 0 : 4}]}>
                    <Text style={[styles.button_text,{color : disabledStyle ? theme.colors.primary : theme.colors.accent}]}>{item}</Text>
                </TouchableOpacity>
            )
        } else {
            const iconSize = BaseStyles.dimensions.fullWidth * 0.07
            return (
                <TouchableOpacity onPress = { () => props.onBackspacePress() } 
                    disabled = {props.input.length === 0}>
                    <Icon color={theme.colors.primaryDark} name="backspace" 
                    type="font-awesome" size={iconSize} style={styles.backspace_button} />
                </TouchableOpacity>     
            )
        }
    }


    const row1 = ['Q','W','E','R','T','Y','U','I','O','P']
    const row2 = ['A','S','D','F','G','H','J','K','L']
    const row3 = ['Z','X','C','V','B','N','M','0']
    // const row1 = ['Q']
    return(
        <View style={styles.container}>
            <View style={styles.row_container}>
                <FlatList
                    horizontal = {true}
                    data = {row1}
                    keyExtractor = { (item) => item}
                    renderItem = {renderLetter}
                    />
            </View>
            <View style={styles.row_container}>
                <FlatList
                    horizontal = {true}
                    data = {row2}
                    keyExtractor = { (item) => item}
                    renderItem = {renderLetter}
                    />
            </View>
            <View style={styles.row_container}>
                <FlatList
                    horizontal = {true}
                    data = {row3}
                    keyExtractor = { (item) => item}
                    renderItem = {renderLetter}
                    />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container : {
        flex : 3,
        padding : BaseStyles.padding.md
    },
    row_container : {
        flex : 1, //Must be 1/3 of container
        justifyContent : 'center',
        alignItems : 'center'
    },
    button_container  : {
        backgroundColor : BaseStyles.defaultColors.primaryDark,
        borderRadius : 20,
        borderWidth : 0.5,
        alignItems : 'center',
        justifyContent : 'center',
        width : ((BaseStyles.dimensions.fullWidth-(2* BaseStyles.padding.md)) * 0.10) - (2 * BaseStyles.margin.sm * 0.5),
        height : "85%",
        marginBottom : BaseStyles.margin.sm,
        paddingHorizontal : BaseStyles.padding.sm * 0.5,
        marginHorizontal : BaseStyles.margin.sm * 0.5,
        elevation : 4
    },
    button_text : {
        color : BaseStyles.defaultColors.accent,
        fontSize : BaseStyles.dimensions.fullWidth * 0.40 * 0.14,
        fontFamily : BaseStyles.fonts.primary
    },
    backspace_button_container : {
        backgroundColor : BaseStyles.defaultColors.primaryDark,
        borderRadius : 18,
        borderWidth : 0.5,
        alignItems : 'center',
        justifyContent : 'center',
        width : ((BaseStyles.dimensions.fullWidth-(2* BaseStyles.padding.md)) * 0.13),
        height : "85%",
        marginBottom : BaseStyles.margin.sm,
        // paddingHorizontal : BaseStyles.padding.sm * 0.5,
        marginHorizontal : BaseStyles.margin.sm * 0.5,
        elevation : 4
    },
    backspace_button : {
        paddingVertical : BaseStyles.padding.md * 0.8,
        paddingHorizontal : BaseStyles.padding.sm * 0.5,
        marginHorizontal : BaseStyles.margin.sm * 0.5,
    }
})

export default KeyboardComponent;