import * as React from 'react';
import { Text,View,Switch } from 'react-native';
import * as BaseStyles from '../../styles/base';
import * as ThemeColours from '../../styles/themes';
import { useSelector, useDispatch } from 'react-redux';
import { setSound, setVibrate} from '../../redux/actionCreators';
import { setColors } from '../../redux/actionCreators';
import Icon from 'react-native-vector-icons/FontAwesome5' ;
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import SoundAndVibrate from '../../shared/SoundAndVibrate'

function RenderColors(props){
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const changeThemeColor = (color) => {
        dispatch(setColors(color));
    }
    const setIcon = (colors) => {
        if(theme.colors.primary === colors.primary){
            return(
                <Icon color={colors.accent} name="check" 
                    type="font-awesome" size={15}
                />
            )
        }
        else{
            return(
                <></>
            )
        }
    }


    const renderColor = (colors) => (
        <TouchableNativeFeedback onPress={() => 
            {changeThemeColor(colors)
            SoundAndVibrate.play('button', theme.sound)
        }}>
            <View style={{width:30,height:30,justifyContent:'center',alignItems:'center',
                borderColor:theme.colors.accent,
                borderWidth : 1,
                borderRadius:15,marginHorizontal : 2,
                backgroundColor:colors.primary}}>
                    {setIcon(colors)}
            </View>
        </TouchableNativeFeedback>

    )

    return(
        <View style={{flexDirection:'row'}}>
            {renderColor(ThemeColours.darkTheme.colors)}
            {renderColor(ThemeColours.lightTheme.colors)}
            {renderColor(ThemeColours.jungleTheme.colors)}
            {renderColor(ThemeColours.skyTheme.colors)}
            {renderColor(ThemeColours.desertTheme.colors)}
        </View>
    );
}
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

    const closeButtonContainerStyle = {
        flex : 0.1,
        marginTop : (-1 * BaseStyles.margin.lg)  + BaseStyles.margin.sm,
        marginRight : (-1 * BaseStyles.margin.lg)  + BaseStyles.margin.sm,
        alignItems : "flex-end"
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
        SoundAndVibrate.play('button', theme.sound)
        if(soundValue){
            dispatch(setSound(false));
        }
        else{
            dispatch(setSound(true));
        }
        
    }

    const toggleVibrate = () => {
        console.log(" [HomeCardComponent.js] " + "toggling vibrate");
        SoundAndVibrate.play('button', theme.sound)
        if(vibrateValue){
            dispatch(setVibrate(false));
        }
        else{
            dispatch(setVibrate(true));
        }
    }
    const closeButtonSize = BaseStyles.dimensions.fullWidth * 0.07;
    return(
        <View style={containerStyle}>
            <View style={closeButtonContainerStyle}>
                <TouchableOpacity>
                    <Icon color={theme.colors.accent} name="times-circle" 
                            type="font-awesome" size={closeButtonSize}
                            onPress = {props.onClosePress}
                        />
                </TouchableOpacity>

            </View>

            <View style={rowContainerStyle}>
                <View style={rowStyle}>
                    <Text style={textStyle}>Sound</Text>                
                    <Switch
                        trackColor={{ true: ThemeColours.jungleTheme.colors.primary, false:'#d3d3d3'  }}
                        thumbColor={'#ffffff'}
                        onValueChange={toggleSound}
                        value={soundValue} />
                </View>
            </View>

            <View style={rowContainerStyle}>
                <View style={rowStyle}>
                    <Text style={textStyle}>Vibrate</Text>                
                    <Switch
                        trackColor={{ true: ThemeColours.jungleTheme.colors.primary, false:'#d3d3d3'  }}
                        thumbColor={'#ffffff'}
                        onValueChange={toggleVibrate}
                        value={vibrateValue} />
                </View>
            </View>

            <View style={rowContainerStyle}>
                <View style={rowStyle}>
                    <Text style={textStyle}>Theme</Text>                
                    <RenderColors />
                </View>
            </View>


        </View>
    )
}

export default SettingsComponent;