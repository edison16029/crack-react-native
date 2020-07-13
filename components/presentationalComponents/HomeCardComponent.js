import * as React from 'react';
import { Text,View,StyleSheet,TouchableOpacity,TouchableHighlight } from 'react-native';
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
                <SettingsComponent onClosePress={props.onClosePress}/>
            </View>
        )
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
        flex : 4,
        backgroundColor : BaseStyles.defaultColors.primaryDark,
        borderRadius : 20,
        borderWidth : 0,
        alignItems : 'center',
        justifyContent : 'center',
        width : BaseStyles.dimensions.fullWidth * 0.80,
        height : BaseStyles.dimensions.fullWidth * 0.80,
        marginVertical : BaseStyles.padding.lg,
        paddingVertical : BaseStyles.padding.lg,
        paddingHorizontal : BaseStyles.padding.lg,
        elevation : 10
    },
})

export default HomeCardComponent;