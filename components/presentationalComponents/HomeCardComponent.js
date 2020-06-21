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
            <TouchableOpacity onPress={() => {console.log("Hello")}}style = {[styles.card_container,{backgroundColor : theme.colors.primaryDark}]}>
                <SettingsComponent />
            </TouchableOpacity>
        )
    else if(props.content === 'howToPlay'){
        return (
            <TouchableOpacity style = {[styles.card_container,{backgroundColor : theme.colors.primaryDark}]}>
                <Text>How To Play</Text>
            </TouchableOpacity>
        )
    }
    else{
        return (
            <TouchableOpacity style = {[styles.card_container,{backgroundColor : theme.colors.primaryDark}]}>
                <LogoComponent />
            </TouchableOpacity>
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
        marginBottom : BaseStyles.padding.sm,
        paddingVertical : BaseStyles.padding.lg,
        paddingHorizontal : BaseStyles.padding.lg,
        elevation : 10
    },
})

export default HomeCardComponent;