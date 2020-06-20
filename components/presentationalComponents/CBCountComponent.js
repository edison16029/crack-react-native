import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {useSelector} from 'react-redux'
import Icon from '../CustomIconComponent'
import * as BaseStyles from '../../styles/base'
import PropTypes from 'prop-types'

function CBCountComponent(props) {
    const {iconName, iconSize, CBCount} = props
    const theme = useSelector(state => state.theme)
    const iconStyle = {color : theme.colors.accent, }
    const resultContainerFont = StyleSheet.flatten([
        styles.resultContainerFont,
        {color : theme.colors.accent}
    ])

    return (
        <View style = {styles.resultContainer}>
            <Icon name = {iconName} size = {iconSize} style = {iconStyle} />
            <Text style = {resultContainerFont}> : {CBCount}</Text>
        </View> 
    );
}

const styles = StyleSheet.create({
    resultContainer : {
        flexDirection : 'row',
        paddingVertical : BaseStyles.padding.sm,
    },
    resultContainerFont : {
        fontSize : BaseStyles.fonts.md,
        paddingRight : BaseStyles.padding.md,
        textAlign : 'left',
    }
})

CBCountComponent.propTypes = {
    iconName : PropTypes.string.isRequired,
    iconSize : PropTypes.number.isRequired,
    CBCount : PropTypes.number.isRequired,
}


export default CBCountComponent;