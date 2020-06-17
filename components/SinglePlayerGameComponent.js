import React, {Component} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchTargetWord,fetchGuessResult } from '../shared/fetchFunctions'
//Redux
import { connect } from 'react-redux'
//Presentational Components
import GuessInputComponent from './presentationalComponents/GuessInputComponent'
import GuessHistoryComponent from './presentationalComponents/GuessHistoryComponent'
import GuessResultComponent from './presentationalComponents/GuessResultComponent'

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
            targetWord : {}, 
            guesses : [], // array of {id : X, $WO, cows : X, bulls : X}
        };
    }

    componentDidMount() {
        fetchTargetWord("easy", this.handleFetchTargetWord)
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
                return {guesses, id : prevState.id + 1}
            })
        }
        // else handle error
    }


    render() {
        const containerStyle = {
            flex : 1,
            backgroundColor : this.props.theme.colors.primary,
        }
        return (
            <SafeAreaView style = {containerStyle}>
                <GuessHistoryComponent guesses = {this.state.guesses.slice(1)}/>
                <GuessResultComponent 
                    guess = {this.state.guesses.length > 0 ? this.state.guesses[0]['word'] : null}
                    cows = {this.state.guesses.length > 0 ? this.state.guesses[0]['cows'] : 0}
                    bulls = {this.state.guesses.length > 0 ? this.state.guesses[0]['bulls'] : 0} />
                <GuessInputComponent 
                    input = {this.state.input}
                    handleChangeText = {this.handleChangeText}
                    handleGuessButtonPress = {this.handleGuessButtonPress}/>
            </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps)(SinglePlayerGameComponent)