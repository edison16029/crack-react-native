import React from 'react';
import { Text,View,StyleSheet } from "react-native";
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';
import * as Comments from '../../shared/comments';

function getComment(guess){
    if(guess==null){
        return Comments.beginning[Math.floor(Math.random()* Comments.beginning.length)]
    }
    else if(guess['bulls']==4){
        return "Cr4cked!!!"
    }
    else if(guess['is_profane']){
        return Comments.profane[Math.floor(Math.random()* Comments.profane.length)]
    }
    else if(guess['bulls']>=3 || (guess['bulls']+guess['cows']) >=4 ){
        return Comments.almost[Math.floor(Math.random()* Comments.almost.length)]
    }
    else if((guess['bulls']+guess['cows']) == 0){
        return Comments.stray[Math.floor(Math.random()* Comments.stray.length)]
    }
    else{
        return Comments.general[Math.floor(Math.random()* Comments.general.length)]
    }
}
function CommentComponent(props){
    const theme = useSelector( state => state.theme);
    const text = getComment(props.response);
    return (
        <View style={[styles.container,{backgroundColor : theme.colors.primary}]}>
            <Text style={[styles.textStyle,{color: theme.colors.accent }]}>
                {text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        paddingHorizontal : BaseStyles.padding.lg,
    },
    textStyle : {
        textAlign : 'center',
        fontSize : BaseStyles.fonts.lg,
        fontFamily : BaseStyles.fonts.primary
    }
})

export default CommentComponent;