import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import CBCountComponent from './CBCountComponent'
import * as BaseStyles from '../../styles/base'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import Icon from '../CustomIconComponent'

function GuessResultComponent(props) {
    const {guess, cows, bulls} = props
    const theme = useSelector(state => state.theme)
    const cardContainer = StyleSheet.flatten([
        styles.cardContainer,
        {backgroundColor : theme.colors.primaryDark}

    ])
    const font = StyleSheet.flatten([
        styles.font,
        {color : theme.colors.accent}
    ])
    const iconSize = BaseStyles.dimensions.fullHeight * 0.06
    const logoSize = BaseStyles.dimensions.fullWidth * 0.3

    if(guess) { 
        return (
            <View style = {cardContainer}>
                <Text style = {font}>{guess}</Text>
                <View style = {{flex : 1, alignItems : 'flex-start', justifyContent : 'space-around'}}>
                    <CBCountComponent iconName = {"crosshair"} iconSize = {iconSize} CBCount = {cows} />
                    <CBCountComponent iconName = {"bullseye"} iconSize = {iconSize} CBCount = {bulls} />
                </View>
            </View>
        )
    } else {
        return (
            <View style = {cardContainer}>
                <Icon name = "logo" size = {logoSize} style = {{color : theme.colors.accent}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer : {
        flex : 2,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : BaseStyles.padding.md,
        marginHorizontal : BaseStyles.padding.xl,
        borderRadius : BaseStyles.borderRadius.radiusLg,
        elevation : 5,    
    },
    font : {
        fontSize : BaseStyles.fonts.lg,
        flex : 1,
        textAlign : 'right',
        marginRight : BaseStyles.margin.lg,
        textTransform : 'uppercase'
    },
});


GuessResultComponent.propTypes = {
    guess : PropTypes.string,
    cows : PropTypes.number.isRequired,
    bulls : PropTypes.number.isRequired,
}

export default GuessResultComponent;