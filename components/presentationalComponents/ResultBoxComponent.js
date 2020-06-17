import React from 'react'
import {View, StyleSheet} from 'react-native'
import {defaultColors, padding, borders, fonts, dimensions} from '../../styles/base'
import PropTypes from 'prop-types'

function ResultBoxComponent(props) {
    const {cows, bulls} = props

    const colourBoxes = (cows,bulls) => {
        let boxes = []
        let key = 0
        for(let i = 0; i < cows; i++)
            boxes.push(<View key = {key++} style = {[styles.resultBox, {backgroundColor : "green"}]}/>)

        for(let i = 0; i < bulls; i++)
            boxes.push(<View key = {key++} style = {[styles.resultBox, {backgroundColor : "red"}]}/>)
        
        for(let i = 0; i < 4 - (cows + bulls); i++)
            boxes.push(<View key = {key++} style = {styles.resultBox}/>)

        return boxes
    }

    return (
        <View style = {styles.resultBoxContainer}>
            {colourBoxes(cows,bulls)}
        </View>
    );
}

const styles = StyleSheet.create({
    resultBoxContainer : {
        width : `50%`,
        height : dimensions.fullHeight * 0.0625,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        paddingLeft : padding.md,
        //backgroundColor : "red",
    },
    resultBox : {
        width : dimensions.fullHeight * 0.0625 * 0.6,
        height : dimensions.fullHeight * 0.0625 * 0.6,
        margin : padding.xs,
        borderRadius : 5,
        borderColor : defaultColors.accent,
        borderWidth : 1.5,
    },
})

ResultBoxComponent.propTypes = {
    cows : PropTypes.number.isRequired,
    bulls : PropTypes.number.isRequired,
}


export default ResultBoxComponent;