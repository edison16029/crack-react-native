import * as React from 'react';
import { Component } from 'react';
import { View,Text,TouchableOpacity,TouchableNativeFeedback,TouchableHighlight } from 'react-native';
import * as Themes from '../styles/themes';
//Redux
import { connect } from 'react-redux';
import { setTheme } from '../redux/actionCreators';
import { setColors} from '../redux/actionCreators';
//Presentational Components
import AppBarComponent from './presentationalComponents/AppBarComponent'; 
import HomeCardComponent from './presentationalComponents/HomeCardComponent';
import ButtonComponent from './presentationalComponents/ButtonComponent';
// import { TouchableOpacity } from 'react-native-gesture-handler';



const mapStateToProps = (state) => {
    return {
        theme : state.theme
    }
}

const mapDispatchToProps = (dispatch) => ({
    setTheme : (theme) => dispatch(setTheme(theme)),
    setColors : (colors) => dispatch(setColors(colors))
})

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            homeCardContent : 'logo',
        };
        this.onPlayPress = this.onPlayPress.bind(this);
        this.onHowToPlayPress = this.onHowToPlayPress.bind(this);
        this.onSettingsPress = this.onSettingsPress.bind(this);
        this.onScreenPress = this.onScreenPress.bind(this);
    }

    componentDidMount(){
        // this.props.setTheme(Themes.skyTheme)
        this.props.setColors(Themes.skyTheme.colors);
    }

    onScreenPress() {
        console.log(" [ HomeComponent.js ] " + "Screen Pressed");
        this.setState({
            homeCardContent : 'logo'
        })
    }

    onPlayPress() {
        const { navigation } = this.props;
        console.log(" [HomeComponent.js ] " + "Play Pressed");
        navigation.navigate('Game');
    }

    onHowToPlayPress() {
        this.setState({
            homeCardContent : 'howToPlay'
        })
    }

    onSettingsPress() {
        this.setState({
            homeCardContent : 'settings'
        })
    }
    render() {
        const containerStyle = {
            flex : 1,
            backgroundColor : this.props.theme.colors.primary,
            alignItems : "center"
        }
        return (
            <TouchableNativeFeedback onPress={this.onScreenPress}>
                <View style={containerStyle} >
                    <AppBarComponent
                        onHowToPlayPress = {this.onHowToPlayPress}
                        onSettingsPress = {this.onSettingsPress} />
                        
                        <HomeCardComponent
                            content = {this.state.homeCardContent} />

                    <View style={{flex : 0.5,alignItems:'center',justifyContent:'space-evenly'}}>
                        <ButtonComponent onPress={this.onPlayPress}/>
                    </View>
                </View>
            </TouchableNativeFeedback>

        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent);