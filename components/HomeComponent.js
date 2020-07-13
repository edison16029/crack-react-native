import * as React from 'react';
import { Component } from 'react';
import { View,TouchableNativeFeedback,BackHandler } from 'react-native';
import * as Themes from '../styles/themes';
import SoundAndVibrate from '../shared/SoundAndVibrate'
//Redux
import { connect } from 'react-redux';
import { setTheme } from '../redux/actionCreators';
import { setColors} from '../redux/actionCreators';
//Presentational Components
import AppBarComponent from './presentationalComponents/AppBarComponent'; 
import HomeCardComponent from './presentationalComponents/HomeCardComponent';
import ButtonComponent from './presentationalComponents/ButtonComponent';
import CustomAlertComponent from './presentationalComponents/CustomAlertComponent';
import HowToPlayComponent from './presentationalComponents/HowToPlayComponent';

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
            showExitAlert : false,
            showHowToPlayModal : false,
        };
        this.onPlayPress = this.onPlayPress.bind(this);
        this.onHowToPlayPress = this.onHowToPlayPress.bind(this);
        this.onSettingsPress = this.onSettingsPress.bind(this);
        this.onClosePress = this.onClosePress.bind(this);
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.handleExitButtonPress);
        
    }

    componentDidMount(){
        // this.props.setTheme(Themes.skyTheme)
        // this.props.setColors(Themes.skyTheme.colors);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleExitButtonPress)
    }

    onClosePress() {
        console.log(" [ HomeComponent.js ] " + "Close Pressed");
        SoundAndVibrate.play('button', this.props.theme.sound)
        this.setState({
            homeCardContent : 'logo'
        })
    }

    onPlayPress() {
        SoundAndVibrate.play('button', this.props.theme.sound, this.props.theme.vibrate)
        this.setState({
            homeCardContent : 'logo'
        })
        const { navigation } = this.props;
        console.log(" [HomeComponent.js ] " + "Play Pressed");
        navigation.navigate('Game');
    }

    onHowToPlayPress() {
        SoundAndVibrate.play('button', this.props.theme.sound)
        this.setState({
            showHowToPlayModal : true
        })
    }
    onHowToPlayClosePress = () => {
        SoundAndVibrate.play('button', this.props.theme.sound)
        this.setState({
            showHowToPlayModal : false
        })
    }

    onSettingsPress() {
        SoundAndVibrate.play('button', this.props.theme.sound)
        if(this.state.homeCardContent === 'settings'){
            this.setState({
                homeCardContent : 'logo'
            })
        }
        else{
            this.setState({
                homeCardContent : 'settings'
            })
        }
    }

    handleExitButtonPress = () => {
        console.log(" [HomeComponent.js] " + "Exit Button Pressed...")
        SoundAndVibrate.play('button', this.props.theme.sound, this.props.vibrate)
        this.showExitAlert()
        return true; //Prevents popping up the stack
    }

    //ALERT HANDLERS
    //Exit Alert
    showExitAlert = () => {
        this.setState({showExitAlert : true})
    }
    hideExitAlert = () => {
        this.setState({showExitAlert : false})
    }
    onPressExitPositiveButton = () => {
        SoundAndVibrate.play('button', this.props.theme.sound)
        this.hideExitAlert()
        BackHandler.exitApp();
    }
    onPressExitNegativeButton = () => {
        SoundAndVibrate.play('button', this.props.theme.sound)
        this.hideExitAlert()
    }

    render() {
        const containerStyle = {
            flex : 10,
            backgroundColor : this.props.theme.colors.primary,
            alignItems : "center"
        }
        return (
            <TouchableNativeFeedback>
                <View style={containerStyle} >
                    <AppBarComponent
                        onHowToPlayPress = {this.onHowToPlayPress}
                        onSettingsPress = {this.onSettingsPress} />
                        
                        <HomeCardComponent
                            onClosePress = {this.onClosePress}
                            content = {this.state.homeCardContent} />

                    <View style={{flex : 5,alignItems:'center',justifyContent:'space-evenly'}}>
                        <ButtonComponent onPress={this.onPlayPress}/>
                    </View>

                    <HowToPlayComponent 
                        onClosePress = {this.onHowToPlayClosePress}
                        displayHowToPlay = {this.state.showHowToPlayModal} />

                    <CustomAlertComponent 
                        displayAlert={this.state.showExitAlert} 
                        displayAlertIcon={false} 
                        alertTitleText={"Exit App"} 
                        alertMessageText={"Do you wish to exit the app?"} 
                        displayPositiveButton={true} 
                        positiveButtonText={"EXIT"} 
                        displayNegativeButton={true} 
                        negativeButtonText={"CANCEL"}
                        onPressNegativeButton = {this.onPressExitNegativeButton} 
                        onPressPositiveButton = {this.onPressExitPositiveButton}/> 
                </View>

            </TouchableNativeFeedback>

        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent);