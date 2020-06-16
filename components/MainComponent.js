import 'react-native-gesture-handler';
import * as React from 'react';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponent from './HomeComponent';
import GameComponent from './GameComponent';
import { StatusBar } from 'react-native';
const Stack = createStackNavigator( );

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentDidMount(){
        StatusBar.setHidden(true);
    }
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName = "Home" headerMode = 'none'>
                    <Stack.Screen name = "Home" component = {HomeComponent}/>
                    <Stack.Screen name = "Game" component = {GameComponent} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default MainComponent;