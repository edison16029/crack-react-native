import React from 'react';
import {Text, View, ScrollView, StyleSheet, FlatList} from 'react-native';
import ResultBoxComponent from './ResultBoxComponent'
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
        <ResultBoxComponent cows = {item.cows ? item.cows : 0} bulls = {item.bulls ? item.bulls : 0} />
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
        justifyContent : 'space-around',
        alignItems : 'center',
        margin : BaseStyles.padding.xs,
        borderRadius : BaseStyles.borderRadius.radiusSm,
    },
    font : {
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