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
            showExitAlert : false,
            showSurrenderAlert : false,
            isSurrender : false,
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
    //Exit Alert
    showExitAlert = () => {
        this.setState({showExitAlert : true})
    }
    hideExitAlert = () => {
        this.setState({showExitAlert : false})
    }
    onPressExitPositiveButton = () => {
        this.hideExitAlert()
        this.props.navigation.navigate("Home")
    }
    onPressExitNegativeButton = () => {
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
        this.hideSurrenderAlert()
        this.setState({isSurrender : true})
    }
    onPressSurrenderNegativeButton = () => {
        this.hideSurrenderAlert()
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
            showExitAlert : false,
            showSurrenderAlert : false,
            isSurrender : false,
        })
        fetchTargetWord("easy", this.handleFetchTargetWord)
    }

    handleExitButtonPress = () => {
        console.log("[SinglePlayerGameComponent.js] Exit Button Pressed")
        if(this.state.guesses.length > 0 && this.state.guesses[0]['bulls'] === 4) {
            this.props.navigation.navigate('Home')
        } else {
            this.showExitAlert()
        }
        return true
    }

    handleSurrenderButtonPress = () => {
        console.log("[SinglePlayerGameComponent.js] Surrender Button Pressed")
        this.showSurrenderAlert()
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
        if( (this.state.guesses.length > 0 && this.state.guesses[0]['bulls'] === 4)
            || this.state.isSurrender) {

            return (
                <View style = {containerStyle}>
                    <AppBarGameComponent
                        isSurrenderShown = {false}
                        handleExitButtonPress = {this.handleExitButtonPress}
                        handleSurrenderButtonPress = {this.handleSurrenderButtonPress}/>
                    <CommentComponent 
                        response={this.state.guesses[0]} 
                        isLastGuessWord = {this.state.isLastGuessWord}
                        isRender = {this.state.renderComment} />
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
                // <View style = {containerStyle}>
                <KeyboardAvoidingView style = {{flex : 6}} behavior = {"height"} keyboardVerticalOffset = {32}>
                    <AppBarGameComponent 
                        isSurrenderShown = {true}
                        handleExitButtonPress = {this.handleExitButtonPress}
                        handleSurrenderButtonPress = {this.handleSurrenderButtonPress}/>
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
                </KeyboardAvoidingView>
                // </View>
            );
        }
    }
}

export default connect(mapStateToProps)(SinglePlayerGameComponent)