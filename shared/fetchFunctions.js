import * as Comments from './comments';

const word_list = require('./wordList.json');
const TAG = " [fetchFunctions.js] ";

function getRandomWord(){
    var randomIndex = Math.floor(Math.random() * word_list.length);
    return word_list[randomIndex];
}
export const fetchTargetWord = ( level, callbackHandler ) => {
    var word = getRandomWord();
    var count = 0;
    if(level === 'easy' || level === 'medium' || level === 'hard'){
        while(word.level!==level || word.is_wc!=="true" || word.is_profane===true){
            console.log(TAG + word.word + " is invalid for target word\n");
            word = getRandomWord();
            count +=1;
            if(count === 50){
                callbackHandler(null);
                return;
            }
        }
        console.log(TAG+ "Target Word : "  + JSON.stringify(word));
        callbackHandler(word);
    }
    else{
        callbackHandler(null);
    }
} 

function calculateCnBs(target,guess, guessWordObject){
    var cowCount = 0;
    var bullCount = 0;

    for(var i=0;i<target.length ; i++ ){
        if(target[i]===guess[i]){
            bullCount +=1;
        }
        else{
            for(var j=0;j<guess.length;j++){
                if(target[i]===guess[j]){
                    cowCount +=1;
                }
            }
        }
    }

    var res = {
        ...guessWordObject, 
        cows : cowCount,
        bulls : bullCount
    }
    console.log(TAG+ "Guess Result : ",res);
    return res;

}

export const fetchGuessResult = ( targetWordString, guessWordString, callbackHandler) => {
    var guessWord = null;

    for(var i=0; i<word_list.length;i++){
        var word = word_list[i];
        if(word.word === guessWordString) {
            guessWord = word;
            break;
        }
    }

    if(guessWord){
        callbackHandler(calculateCnBs(targetWordString,guessWordString, guessWord));
    }
    else{
        console.log(TAG+ "Invalid Guess");
        callbackHandler(null);
    }
    return;
}

export const fetchComment = ({isBeginning, guess, isWrongWord, isSurrender}) => {
    console.log("[ SinglePlayerGameComponent.js ] function getComment Guess : ",guess);
    console.log("[ SinglePlayerGameComponent.js ] function getComment isWrongWord : ",isWrongWord);
    if(isBeginning){
        return Comments.beginning[Math.floor(Math.random()* Comments.beginning.length)]
    }
    else if(isSurrender){
        return Comments.surrender[Math.floor(Math.random()* Comments.surrender.length)]
    }
    else if(isWrongWord === true) {
        return Comments.wrongWord[Math.floor(Math.random()* Comments.wrongWord.length)]
    }
    else if(guess['bulls']==4){
        return Comments.cracked[Math.floor(Math.random()* Comments.cracked.length)]
    }
    else if(guess['is_profane']){
        return Comments.profane[Math.floor(Math.random()* Comments.profane.length)]
    }
    else if(guess['bulls']>=3 || (guess['bulls']+guess['cows']) >=4 ){
        return Comments.almost[Math.floor(Math.random()* Comments.almost.length)]
    }
    else if((guess['bulls']+guess['cows']) == 0){
        return Comments.stray[Math.floor(Math.random()* Comments.stray.length)]
    }
    else{
        return Comments.general[Math.floor(Math.random()* Comments.general.length)]
    }
}