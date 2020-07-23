import 'react-native-gesture-handler';
import * as React from 'react';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponent from './HomeComponent';
import GameComponent from './GameComponent';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import SoundAndVibrate from '../shared/SoundAndVibrate';
import SinglePlayerGameComponent from './SinglePlayerGameComponent';

const Stack = createStackNavigator( );

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fontsLoaded : false,
            soundsLoaded : false,
         };
    }

    async _loadFontsAsync() {
        try {
            await Font.loadAsync({
                crackIcons : require('../assets/fonts/crack-icons.ttf')
            });
            this.setState({ fontsLoaded: true });
            console.log("[MainComponent.js] Loaded fonts")
        } catch (error) {
            console.log("[MainComponent.js] Error Loading fonts")
        }
    }

    async _loadSoundsAsync() {
        try {
            SoundAndVibrate.loadSoundsAsync({
                'button' : require('../assets/sounds/button.wav'),
                'cracked' : require('../assets/sounds/cracked.wav'),
                'gameStart' : require('../assets/sounds/gameStart.wav'),
                'rightGuess' : require('../assets/sounds/rightGuess.wav'),
                'wrongGuess' : require('../assets/sounds/wrongGuess.wav'),
                'giveup' : require('../assets/sounds/giveup.wav'),
                'keyPress' : require("../assets/sounds/keyPress2.wav")
            })
            this.setState({ soundsLoaded: true });
            console.log("[MainComponent.js] Loaded sounds")            
        } catch (error) {
            console.warn("[MainComponent.js] Error Loading sounds")
        }
    }

    componentDidMount(){
        StatusBar.setHidden(true)
        this._loadFontsAsync()
        this._loadSoundsAsync()
    }
    render() {
        if (this.state.fontsLoaded && this.state.soundsLoaded) {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" headerMode = 'none'>
                        <Stack.Screen name="Home" component = {HomeComponent}/>
                        <Stack.Screen name="Game" component={GameComponent} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        } else {
            return <AppLoading />;
        }
    }
}

export default MainComponent;