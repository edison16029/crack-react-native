import React, {Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchTargetWord,fetchGuessResult } from '../shared/fetchFunctions'
//Redux
import { connect } from 'react-redux'
//Presentational Components
import AppBarComponent from './presentationalComponents/AppBarComponent'
import GuessInputComponent from './presentationalComponents/GuessInputComponent'
import WinnerScreenComponent from './presentationalComponents/WinnerScreenComponent'
import GuessHistoryComponent from './presentationalComponents/GuessHistoryComponent'
import GuessResultComponent from './presentationalComponents/GuessResultComponent'
import CommentComponent from './presentationalComponents/CommentComponent';
import { KeyboardAvoidingView, View, Alert, BackHandler } from 'react-native';
import AppBarGameComponent from './presentationalComponents/AppBarGameComponent';
import CustomAlertComponent from './presentationalComponents/CustomAlertComponent';

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
            isLastGuessWord : true,
            renderComment : true,
            targetWord : {}, 
            guesses : [], // array of {id : X, $WO, cows : X, bulls : X}
            showAlert : false
        };
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.handleExitButtonPress)
    }

    componentDidMount() {
        fetchTargetWord("easy", this.handleFetchTargetWord)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleExitButtonPress)
    }

    //ALERT HANDLERS
    showAlert = () => {
        this.setState({showAlert : true})
    }

    hideAlert = () => {
        this.setState({showAlert : false})
    }

    onPressPositiveButton = () => {
        this.hideAlert()
        this.props.navigation.navigate("Home")
    }

    onPressNegativeButton = () => {
        this.hideAlert()
    }

    //HANDLERS FOR UI
    handleChangeText = (text) => {
        this.setState({input : text, renderComment : false});
    }

    handleGuessButtonPress = () => {
        if(this.state.input.length == 4) {
            fetchGuessResult(this.state.targetWord['word'], this.state.input.toLowerCase(), this.handleFetchGuessResult)
            this.setState({input : "", renderComment : true})
        }
    };

    handleHomeButtonPress = () => {
        const { navigation } = this.props
        console.log("[SinglePlayerGameComponent.js] " + "Home Button Pressed")
        navigation.navigate('Home')
    }

    handleRestartButtonPress = () => {
        console.log("[SinglePlayerGameComponent.js] " + "Restart Button Pressed")
        this.setState({            
            id : 0,
            input : "",
            isLastGuessWord : true,
            renderComment : true,
            targetWord : {}, 
            guesses : [],
        })
        fetchTargetWord("easy", this.handleFetchTargetWord)
    }

    handleExitButtonPress = () => {
        console.log("[SinglePlayerGameComponent.js] Exit Button Pressed")
        if(this.state.guesses.length > 0 && this.state.guesses[0]['bulls'] === 4) {
            this.props.navigation.navigate('Home')
        } else {
            this.showAlert()
            // Alert.alert(
            //     "Quit Game",
            //     "Do you wish to quit?",
            //     [
            //         {
            //             text : "Confirm",
            //             onPress : () =>  {
            //                 console.log("[SinglePlayerGameComponent.js] Exit Confirm Pressed")
            //                 Alert.alert(
            //                     "Quit Game",
            //                     "The word to be cracked was " + this.state.targetWord['word'].toUpperCase(),
            //                     [
            //                         {
            //                             text : "Ok",
            //                             onPress : () => {
            //                                 this.props.navigation.navigate('Home')
            //                             }
            //                         }
            //                     ],
            //                     {cancelable : false}
            //                     )
            //                // this.props.navigation.navigate('Home')
            //             }
            //         },
            //         {
            //             text : "Cancel",
            //             onPress : () => console.log("[SinglePlayerGameComponent.js] Exit Cancel Pressed"),
            //             style : "cancel",
            //         }
            //     ],
            // )
        }
        return true
    }

    //HANDLERS FOR SERVER FETCH
    handleFetchTargetWord = (response) => {
        console.log("[SinglePlayerGameComponent.js] TargetWord : " + JSON.stringify(response))
        this.setState({targetWord : response})
    }

    handleFetchGuessResult = (response) => {
        console.log("[SinglePlayerGameComponent.js] GuessResult : " + JSON.stringify(response))
        if(response) {
            this.setState((prevState) => {
                const guesses = [{
                    id : prevState.id,
                    ...response}, ...prevState.guesses] 
                return {guesses, id : prevState.id + 1, isLastGuessWord : true}
            })
        }
        else {
            this.setState({isLastGuessWord : false})
        }
    }


    render() {
        const containerStyle = {
            flex : 1,
            backgroundColor : this.props.theme.colors.primary,
        }
        if(this.state.guesses.length > 0 && this.state.guesses[0]['bulls'] === 4) {
            return (
                <View style = {containerStyle}>
                    <AppBarGameComponent handleExitButtonPress = {this.handleExitButtonPress}/>
                    <CommentComponent 
                        response={this.state.guesses[0]} 
                        isLastGuessWord = {this.state.isLastGuessWord}
                        isRender = {this.state.renderComment} />
                    <GuessHistoryComponent guesses = {this.state.guesses}/> 
                    <WinnerScreenComponent 
                        guess = {this.state.guesses[0]['word']}
                        handleHomeButtonPress = {this.handleHomeButtonPress}
                        handleRestartButtonPress = {this.handleRestartButtonPress} /> 
                </View>
            )
        } else {
            return (
                // <View style = {containerStyle}>
                <KeyboardAvoidingView style = {{flex : 6}} behavior = {"height"} keyboardVerticalOffset = {32}>
                    <AppBarGameComponent handleExitButtonPress = {this.handleExitButtonPress}/>
                    <CommentComponent 
                        response={this.state.guesses[0]} 
                        isLastGuessWord = {this.state.isLastGuessWord}
                        isRender = {this.state.renderComment}/>
                    <GuessHistoryComponent guesses = {this.state.guesses.slice(1)}/>
                    <GuessResultComponent 
                        guess = {this.state.guesses.length > 0 ? this.state.guesses[0]['word'] : null}
                        cows = {this.state.guesses.length > 0 ? this.state.guesses[0]['cows'] : 0}
                        bulls = {this.state.guesses.length > 0 ? this.state.guesses[0]['bulls'] : 0} /> 
                    <GuessInputComponent 
                        input = {this.state.input}
                        handleChangeText = {this.handleChangeText}
                        handleGuessButtonPress = {this.handleGuessButtonPress}/>
                        
                    <CustomAlertComponent 
                        displayAlert={this.state.showAlert} 
                        displayAlertIcon={false} 
                        alertTitleText={"Quit Game"} 
                        alertMessageText={"Do you wish to quit?"} 
                        displayPositiveButton={true} 
                        positiveButtonText={"QUIT"} 
                        displayNegativeButton={true} 
                        negativeButtonText={"CANCEL"}
                        onPressNegativeButton = {this.onPressNegativeButton} 
                        onPressPositiveButton = {this.onPressPositiveButton}/> 
                </KeyboardAvoidingView>
                // </View>
            );
        }
    }
}

export default connect(mapStateToProps)(SinglePlayerGameComponent)