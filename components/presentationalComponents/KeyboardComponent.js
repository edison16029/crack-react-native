import * as React from 'react';
import { View,Text, FlatList,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';


function KeyboardComponent(props) {
    
    const theme = useSelector( state => state.theme);
    const renderLetter = ({item}) => {
        var disabled = props.input.includes(item)
        return (
            <TouchableOpacity
              disabled = {disabled}
              onPress = { () =>  props.onKeyPress(item) }    
              style={[styles.button_container,{backgroundColor : theme.colors.primaryDark,borderColor : theme.colors.accent}]}>
                <Text style={[styles.button_text,{color : disabled ? theme.colors.primary : theme.colors.accent}]}>{item}</Text>
            </TouchableOpacity>
        )
    }


    const row1 = ['Q','W','E','R','T','Y','U','I','O','P']
    const row2 = ['A','S','D','F','G','H','J','K','L']
    const row3 = ['Z','X','C','V','B','N','M']
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
        width : ((BaseStyles.dimensions.fullWidth-(2* BaseStyles.padding.md)) * 0.10) - (2* BaseStyles.margin.sm * 0.5),
        height : "85%",
        marginBottom : BaseStyles.margin.sm,
        paddingHorizontal : BaseStyles.padding.sm * 0.5,
        marginHorizontal : BaseStyles.margin.sm * 0.5,
        elevation : 4
    },
    button_text : {
        color : BaseStyles.defaultColors.accent,
        fontSize : BaseStyles.dimensions.fullWidth * 0.40 * 0.15,
        fontFamily : BaseStyles.fonts.primary
    },
})

export default KeyboardComponent;