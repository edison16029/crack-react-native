import React, {Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchTargetWord,fetchGuessResult, fetchComment } from '../shared/fetchFunctions'
//Redux
import { connect } from 'react-redux'
//Presentational Components
import AppBarComponent from './presentationalComponents/AppBarComponent'
import GuessInputComponent from './presentationalComponents/GuessInputComponent'
import WinnerScreenComponent from './presentationalComponents/WinnerScreenComponent'
import GuessHistoryComponent from './presentationalComponents/GuessHistoryComponent'
import GuessResultComponent from './presentationalComponents/GuessResultComponent'
import CommentComponent from './presentationalComponents/CommentComponent';
import KeyboardComponent from './presentationalComponents/KeyboardComponent';
import { KeyboardAvoidingView, View, Alert, BackHandler, Dimensions } from 'react-native';
import AppBarGameComponent from './presentationalComponents/AppBarGameComponent';
import CustomAlertComponent from './presentationalComponents/CustomAlertComponent';
import SoundAndVibrate from '../shared/SoundAndVibrate'


const mapStateToProps = (state) => {
    return {
        theme : state.theme
    }
}

class SinglePlayerGameComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : 0,
            input : "",
            comment : "",
            targetWord : {}, 
            guesses : [], // array of {id : X, $WO, cows : X, bulls : X}
            showExitAlert : false,
            showSurrenderAlert : false,
            isSurrender : false,
        };
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.handleExitButtonPress)
    }

    componentDidMount() {
        SoundAndVibrate.play('keyPress', this.props.theme.sound)
        fetchTargetWord("easy", this.handleFetchTargetWord)
        const commentOptions = {
            isBeginning : true,
            guess : null,
            isWrongWord : null,
            isSurrender : false
        }
        this.setState({comment : fetchComment(commentOptions)})
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleExitButtonPress)
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
        this.props.navigation.navigate("Home")
    }
    onPressExitNegativeButton = () => {
        SoundAndVibrate.play('button', this.props.theme.sound)
        this.hideExitAlert()
    }
    //Surrender Alert
    showSurrenderAlert = () => {
        this.setState({showSurrenderAlert : true})
    }
    hideSurrenderAlert = () => {
        this.setState({showSurrenderAlert : false})
    }
    onPressSurrenderPositiveButton = () => {
        SoundAndVibrate.play('button', this.props.theme.sound)
        this.hideSurrenderAlert()
        const commentOptions = {
            isBeginning : null,
            guess : null,
            isWrongWord : null,
            isSurrender : true
        }
        this.setState({isSurrender : true,comment : fetchComment(commentOptions)})

    }
    onPressSurrenderNegativeButton = () => {
        SoundAndVibrate.play('button', this.props.theme.sound)
        this.hideSurrenderAlert()
    }

    //HANDLERS FOR UI
    handleChangeText = (text) => {
        this.setState({input : text});
    }

    handleGuessButtonPress = () => {
        if(this.state.input.length == 4) {
            fetchGuessResult(this.state.targetWord['word'], this.state.input.toLowerCase(), this.handleFetchGuessResult)
            this.setState({input : ""})
        }
    };

    handleHomeButtonPress = () => {
        SoundAndVibrate.play('button', this.props.theme.sound)
        const { navigation } = this.props
        console.log("[SinglePlayerGameComponent.js] " + "Home Button Pressed")
        navigation.navigate('Home')
    }

    handleRestartButtonPress = () => {
        SoundAndVibrate.play('gameStart', this.props.theme.sound)
        console.log("[SinglePlayerGameComponent.js] " + "Restart Button Pressed")
        this.setState({            
            id : 0,
            input : "",
            comment : "",
            targetWord : {}, 
            guesses : [],
            showExitAlert : false,
            showSurrenderAlert : false,
            isSurrender : false,
        })
        fetchTargetWord("easy", this.handleFetchTargetWord)
        const commentOptions = {
            isBeginning : true,
            guess : null,
            isWrongWord : null,
            isSurrender : false
        }
        this.setState({comment : fetchComment(commentOptions)})
    }

    handleExitButtonPress = () => {
        console.log("[SinglePlayerGameComponent.js] Exit Button Pressed")
        SoundAndVibrate.play('button', this.props.theme.sound, this.props.theme.vibrate)
        if(this.state.guesses.length > 0 && this.state.guesses[0]['bulls'] === 4 || this.state.isSurrender) {
            this.props.navigation.navigate('Home')
        } else {
            this.showExitAlert()
        }
        return true
    }

    handleSurrenderButtonPress = () => {
        console.log("[SinglePlayerGameComponent.js] Surrender Button Pressed")
        SoundAndVibrate.play('button', this.props.theme.sound, this.props.theme.vibrate)
        this.showSurrenderAlert()
    }

    handleKeyPress = (key) => {
        // console.log(" [SinglePlayerGameComponent.js] " + "Key : ",key )
        SoundAndVibrate.play('keyPress', this.props.theme.sound)
        this.setState( (prevState) => {
            return {input : prevState.input+key}
        })
    }

    handleBackspacePress = () => {
        SoundAndVibrate.play('keyPress', this.props.theme.sound)
        this.setState( (prevState) => {
            return {input : prevState.input.slice(0,-1)}
        })
    }
    
    //HANDLERS FOR SERVER FETCH
    handleFetchTargetWord = (response) => {
        console.log("[SinglePlayerGameComponent.js] TargetWord : " + JSON.stringify(response))
        this.setState({targetWord : response})
    }

    handleFetchGuessResult = (response) => {
        console.log("[SinglePlayerGameComponent.js] GuessResult : " + JSON.stringify(response))
        if(response) {
            SoundAndVibrate.play('rightGuess', this.props.theme.sound)
            const commentOptions = {
                isBeginning : false,
                guess : response,
                isWrongWord : false,
                isSurrender : false
            }
            this.setState((prevState) => {
                const guesses = [{
                    id : prevState.id,
                    ...response
                    }, ...prevState.guesses] 
                return {guesses, id : prevState.id + 1, comment : fetchComment(commentOptions)}
            })
        }
        else {
            SoundAndVibrate.play('wrongGuess', this.props.theme.sound, this.props.theme.vibrate)
            const commentOptions = {
                isBeginning : false,
                guess : null,
                isWrongWord : true,
                isSurrender : false
            }
            this.setState({comment : fetchComment(commentOptions)})
        }
    }

    render() {
        const containerStyle = {
            flex : 1,
            backgroundColor : this.props.theme.colors.primary,
        }
        if( (this.state.guesses.length > 0 && this.state.guesses[0]['bulls'] === 4)
            || this.state.isSurrender) {

            return (
                <View style = {containerStyle}>
                    <AppBarGameComponent
                        isSurrenderShown = {false}
                        handleExitButtonPress = {this.handleExitButtonPress}
                        handleSurrenderButtonPress = {this.handleSurrenderButtonPress}/>
                    <CommentComponent 
                        comment = {this.state.comment}/>
                    <GuessHistoryComponent guesses = {this.state.guesses}/> 
                    <WinnerScreenComponent 
                        isSurrender = {this.state.isSurrender}
                        guess = {this.state.targetWord['word']}
                        handleHomeButtonPress = {this.handleHomeButtonPress}
                        handleRestartButtonPress = {this.handleRestartButtonPress} />
                </View>
            )
        } else {
            return (
                <View style = {containerStyle}>
                    <AppBarGameComponent 
                        isSurrenderShown = {true}
                        handleExitButtonPress = {this.handleExitButtonPress}
                        handleSurrenderButtonPress = {this.handleSurrenderButtonPress}/>
                    <CommentComponent 
                        comment = {this.state.comment}/>
                    <GuessHistoryComponent guesses = {this.state.guesses.slice(1)}/>
                    <GuessResultComponent 
                        guess = {this.state.guesses.length > 0 ? this.state.guesses[0]['word'] : null}
                        cows = {this.state.guesses.length > 0 ? this.state.guesses[0]['cows'] : 0}
                        bulls = {this.state.guesses.length > 0 ? this.state.guesses[0]['bulls'] : 0} /> 
                    <GuessInputComponent 
                        input = {this.state.input}
                        handleChangeText = {this.handleChangeText}
                        handleGuessButtonPress = {this.handleGuessButtonPress}/>
                    <KeyboardComponent 
                        onKeyPress={this.handleKeyPress} 
                        onBackspacePress = {this.handleBackspacePress}
                        input={this.state.input}/>
                        
                    <CustomAlertComponent 
                        displayAlert={this.state.showExitAlert} 
                        displayAlertIcon={false} 
                        alertTitleText={"Quit Game"} 
                        alertMessageText={"Do you wish to quit?"} 
                        displayPositiveButton={true} 
                        positiveButtonText={"QUIT"} 
                        displayNegativeButton={true} 
                        negativeButtonText={"CANCEL"}
                        onPressNegativeButton = {this.onPressExitNegativeButton} 
                        onPressPositiveButton = {this.onPressExitPositiveButton}/> 

                    <CustomAlertComponent 
                        displayAlert={this.state.showSurrenderAlert} 
                        displayAlertIcon={false} 
                        alertTitleText={"Give Up"} 
                        alertMessageText={"Are you sure you want to give up?"} 
                        displayPositiveButton={true} 
                        positiveButtonText={"GIVE UP"} 
                        displayNegativeButton={true} 
                        negativeButtonText={"CANCEL"}
                        onPressNegativeButton = {this.onPressSurrenderNegativeButton} 
                        onPressPositiveButton = {this.onPressSurrenderPositiveButton}/>                     

                </View>
            );
        }
    }
}

export default connect(mapStateToProps)(SinglePlayerGameComponent)