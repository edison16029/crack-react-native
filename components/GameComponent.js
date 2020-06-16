import * as React from 'react';
import { Component } from 'react';
import { View,Text } from 'react-native';

class GameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View>
                <Text>Game Component</Text>
            </View>
        );
    }
}

export default GameComponent;