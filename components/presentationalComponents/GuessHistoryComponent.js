import React from 'react';
import {Text, View, ScrollView, StyleSheet, FlatList} from 'react-native';
import CBCountComponent from './CBCountComponent'
import * as BaseStyles from '../../styles/base'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'

function GuessHistoryComponent(props) {
    const {guesses} = props
    const theme = useSelector(state => state.theme)
    const container = StyleSheet.flatten([
        styles.container, 
        {backgroundColor : theme.colors.primary}
    ])
    const guessRow = StyleSheet.flatten([
        styles.guessRow, 
        {backgroundColor : theme.colors.primaryDark}
    ])
    const font = StyleSheet.flatten([
        styles.font,
        {color : theme.colors.accent}
    ])


    const renderGuessHistoryRow = ({item,index}) => (
    <View key = {item.id} style = {guessRow}>
        <Text style = {font}>{item.word}</Text>
        <View style = {{flexDirection : 'row'}} >
            <CBCountComponent iconName = "crosshair" iconSize = {36} CBCount = {item.cows} />
            <CBCountComponent iconName = "bullseye" iconSize = {36} CBCount = {item.bulls} />
        </View>
    </View>
    );

    return (
    <View style = {container}>
        <FlatList 
            data = {guesses}
            keyExtractor = {(item) => item.id.toString()}
            renderItem = {renderGuessHistoryRow} 
            inverted />
    </View> 
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 4,
    },
    guessRow : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginVertical : BaseStyles.padding.xs,
        marginHorizontal : BaseStyles.padding.sm,
        borderRadius : BaseStyles.borderRadius.radiusLg,
        elevation : 5,
    },
    font : {
        flex : 1,
        textAlign : 'left',
        marginLeft : BaseStyles.padding.lg,
        fontSize : BaseStyles.fonts.md,
        textTransform : 'uppercase'
    }
});

GuessHistoryComponent.propTypes = {
    guesses : PropTypes.arrayOf(PropTypes.shape({
        id : PropTypes.number.isRequired,
        word : PropTypes.string.isRequired,
        cows : PropTypes.number.isRequired,
        bulls : PropTypes.number.isRequired,
    })).isRequired,
}

export default GuessHistoryComponent;