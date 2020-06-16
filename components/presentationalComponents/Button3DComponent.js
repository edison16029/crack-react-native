import * as React from 'react';
import { Component } from 'react';
import { View,Text,StyleSheet,TouchableHighlight } from 'react-native';
import { dimensions, colors, padding, fonts} from '../../styles/base';


class Button3DComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            count : 0
        }
    }
    render(){
        return (
            <TouchableHighlight
                underlayColor='#ffffff00'
                onPressIn = { () => this.setState({count:1})}
                onPressOut = { () => {
                            this.setState({count:0});
                            // this.props.onPlayPressed();
                        }
                    }
                >

                <View 
                   style = {this.state.count===0 ? styles.play_button_container_outer : styles.play_button_container_outer_pressed}
                    >
                    <View
                        style = {this.state.count===0 ? styles.play_button_container : styles.play_button_container_pressed}
                        >
                        <Text
                        style= {this.state.count===0 ? styles.button_text : styles.button_text_pressed}>
                        PLAY
                        </Text>
                    </View>
                </View>

            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    play_button_container_outer : {
        backgroundColor : "#000",
        borderRadius : 20,
        borderBottomRightRadius : 25,
    },
    play_button_container_outer_pressed : {
        backgroundColor : "transparent",
        borderRadius : 0,
        borderBottomRightRadius : 0,
    },
    play_button_container  : {
        backgroundColor : colors.primary,
        borderRadius : 20,
        alignItems : 'center',
        justifyContent : 'center',
        width : dimensions.fullWidth * 0.40,
        height : dimensions.fullWidth * 0.20,
        marginBottom : padding.sm,
    },
    play_button_container_pressed  : {
        backgroundColor : colors.accent,
        borderRadius : 20,
        alignItems : 'center',
        justifyContent : 'center',
        width : dimensions.fullWidth * 0.40,
        height : dimensions.fullWidth * 0.20,
        marginTop : padding.sm/2,
    },
    button_text : {
        color : colors.accent,
        fontSize : dimensions.fullWidth * 0.40 * 0.15,
        fontFamily : 'serif'
    },
    button_text_pressed : {
        color : colors.primaryDark,
        fontSize : dimensions.fullWidth * 0.40 * 0.15,
        fontFamily : 'serif'
    }
})
export default Button3DComponent;