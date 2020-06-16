import * as React from 'react';
import { View,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5' ;
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';

function HomeCardComponent(props) {
    const size = (BaseStyles.dimensions.fullWidth *0.85 ) * 0.65;
    const theme = useSelector(state => state.theme);
    console.log(" [HomeCardComponent.js] " + theme);    
    return (
        <View style = {[styles.card_container,{backgroundColor : theme.colors.primary}]}>
            <Icon color={theme.colors.accent} name="robot" type="font-awesome" size={size}/>
        </View>
    )
}

const styles = StyleSheet.create({
    card_container : {
        flex : 0.4,
        backgroundColor : BaseStyles.defaultColors.primary,
        borderRadius : 20,
        borderWidth : 0,
        alignItems : 'center',
        width : BaseStyles.dimensions.fullWidth * 0.80,
        height : BaseStyles.dimensions.fullWidth * 0.80,
        marginBottom : BaseStyles.padding.sm,
        paddingVertical : BaseStyles.padding.lg,
        elevation : 10
    },
})

export default HomeCardComponent;