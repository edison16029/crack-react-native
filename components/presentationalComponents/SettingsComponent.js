import * as React from 'react';
import { Text,View,Switch } from 'react-native';
import * as BaseStyles from '../../styles/base';
import { useSelector, useDispatch } from 'react-redux';
import { setSound, setVibrate} from '../../redux/actionCreators';

function SettingsComponent(props){
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const soundValue = theme.sound;
    const vibrateValue = theme.vibrate;
    const containerStyle = {
        flex : 1,
        justifyContent:'space-between',
        width : "100%",

    }

    const rowContainerStyle = {
        flex : 0.33,
        justifyContent : 'center',
        width : "100%",
    }

    const rowStyle = {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : BaseStyles.padding.sm,
        borderWidth : 1,
        borderColor : theme.colors.accent,
        borderRadius : BaseStyles.borderRadius.radiusLg,
    }

    const textStyle = {
        color : theme.colors.accent
    }

    const toggleSound = () => {
        console.log(" [HomeCardComponent.js] " + "toggling sound");
        if(soundValue){
            dispatch(setSound(false));
        }
        else{
            dispatch(setSound(true));
        }
        
    }

    const toggleVibrate = () => {
        console.log(" [HomeCardComponent.js] " + "toggling vibrate");
        if(vibrateValue){
            dispatch(setVibrate(false));
        }
        else{
            dispatch(setVibrate(true));
        }
    }
    return(
        <View style={containerStyle}>
            <View style={rowContainerStyle}>
                <View style={rowStyle}>
                    <Text style={textStyle}>Sound</Text>                
                    <Switch
                        onValueChange={toggleSound}
                        value={soundValue} />
                </View>
            </View>

            <View style={rowContainerStyle}>
                <View style={rowStyle}>
                    <Text style={textStyle}>Vibrate</Text>                
                    <Switch
                        onValueChange={toggleVibrate}
                        value={vibrateValue} />
                </View>
            </View>

            <View style={rowContainerStyle}>
                <View style={rowStyle}>
                    <Text style={textStyle}>Hello</Text>                
                    <Text>Hello</Text>
                </View>
            </View>


        </View>
    )
}

export default SettingsComponent;