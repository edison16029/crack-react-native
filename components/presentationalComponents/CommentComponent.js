import React from 'react';
import { Text,View,StyleSheet } from "react-native";
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';
import * as Comments from '../../shared/comments';


function CommentComponent(props){
    const {comment} = props;
    const displayComment = '"' + comment + '"';
    const theme = useSelector( state => state.theme);
    return (
        <View style={[styles.container,{backgroundColor : theme.colors.primary}]}>
            <Text style={[styles.textStyle,{color: theme.colors.accent }]}>
                {displayComment}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingHorizontal : BaseStyles.padding.lg,
        paddingBottom : BaseStyles.margin.md,       
    },
    textStyle : {
        textAlign : 'center',
        fontSize : BaseStyles.fonts.lg * 0.8,
        fontFamily : BaseStyles.fonts.primary,
    }
})

export default CommentComponent;