import * as React from 'react';
import { Text,View,StyleSheet,Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5' ;
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';
import SettingsComponent from './SettingsComponent';
import LogoComponent from './LogoComponent';

function HomeCardComponent(props) {
    const size = (BaseStyles.dimensions.fullWidth *0.85 ) * 0.65;
    const theme = useSelector(state => state.theme);
    // console.log(" [HomeCardComponent.js] " , theme);
    if(props.content === 'settings')
        return (
            <View style = {[styles.card_container,{backgroundColor : theme.colors.primaryDark}]}>
                <SettingsComponent />
            </View>
        )
    else if(props.content === 'howToPlay'){
        return (
            <View style = {[styles.card_container,{backgroundColor : theme.colors.primaryDark}]}>
                <Text>How To Play</Text>
            </View>
        )
    }
    else{
        return (
            <View style = {[styles.card_container,{backgroundColor : theme.colors.primaryDark}]}>
                <LogoComponent />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card_container : {
        flex : 0.4,
        backgroundColor : BaseStyles.defaultColors.primaryDark,
        borderRadius : 20,
        borderWidth : 0,
        alignItems : 'center',
        justifyContent : 'center',
        width : BaseStyles.dimensions.fullWidth * 0.80,
        height : BaseStyles.dimensions.fullWidth * 0.80,
        marginBottom : BaseStyles.padding.sm,
        paddingVertical : BaseStyles.padding.lg,
        paddingHorizontal : BaseStyles.padding.lg,
        elevation : 10
    },
})

export default HomeCardComponent;