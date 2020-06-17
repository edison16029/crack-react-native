import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import ResultBoxComponent from './ResultBoxComponent'
import * as BaseStyles from '../../styles/base'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'

function GuessResultComponent(props) {
    const {guess, cows, bulls} = props
    const theme = useSelector(state => state.theme)
    const container = StyleSheet.flatten([
        styles.container,
        {backgroundColor : theme.colors.primaryDark}

    ])
    const font = StyleSheet.flatten([
        styles.font,
        {color : theme.colors.accent}
    ])

    return (
        <View style = {container}>
            <Text style = {font}>{guess}</Text>
            <ResultBoxComponent cows = {cows} bulls = {bulls} />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 2,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginVertical : BaseStyles.padding.sm,
        marginHorizontal : BaseStyles.padding.xl,
        borderRadius : BaseStyles.borderRadius.radiusMd,
        elevation : 5,    
    },
    font : {
        fontSize : BaseStyles.fonts.lg,
        textTransform : 'uppercase'
    },
});


GuessResultComponent.propTypes = {
    guess : PropTypes.string,
    cows : PropTypes.number.isRequired,
    bulls : PropTypes.number.isRequired,
}

export default GuessResultComponent;