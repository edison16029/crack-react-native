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

const Stack = createStackNavigator( );

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
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

    componentDidMount(){
        StatusBar.setHidden(true)
        this._loadFontsAsync()
    }
    render() {
        if (this.state.fontsLoaded) {
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