import * as React from 'react';
import { useState } from 'react';
import { Text,View,FlatList,StyleSheet,TouchableOpacity,PanResponder, Modal,Animated } from 'react-native';
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5' ;
import CustomIcon from '../CustomIconComponent'

const textStyle = {
    fontSize : BaseStyles.fonts.sm
}

const PageContent = (page,accentColor) => {
        
    const textStyle = {
        fontSize :  (BaseStyles.fonts.sm+BaseStyles.fonts.md) * 0.5,
        lineHeight : BaseStyles.fonts.lineHeightSm,
        color : accentColor
    }
    if(page==1){

        return (
            <View style={styles.pageStyle}>
                <View style={pageStyle1.topPage}> 
                    <Text style={textStyle}>
                        The goal of the game is to make valid 4-letter guesses to ultimately crack the secret word. 
                    </Text>
                    <Text style={textStyle}></Text>
                    <Text style={textStyle}>
                        Any 4-letter English word in which no letter of the alphabet occurs more than once counts as a valid guess. Each guess provides 2 types of clues which can be used to crack the word.
                    </Text>   
                </View>

                <View style={pageStyle1.bottomPage}> 
                    <View style={pageStyle1.bottomRow}>
                        <View style= {pageStyle1.iconView}>
                            <CustomIcon name = {"crosshair"} size = {48} style = {{color : accentColor}} />
                        </View>
                        <View style = {pageStyle1.iconExplanation}>
                            <Text style={textStyle}>
                                Letter is in the wrong position
                            </Text>   
                        </View>
                    </View>
                    <View style={pageStyle1.bottomRow}>
                        <View style= {pageStyle1.iconView}>
                            <CustomIcon name = {"bullseye"} size = {48} style = {{color : accentColor}} />
                        </View>
                        <View style = {pageStyle1.iconExplanation}>
                            <Text style={textStyle}>
                                Letter is in the right position
                            </Text>   
                        </View>
                    </View>
                </View>

            </View>

            
        )
    }
    else{


        const bracketTextStyle = {
            fontSize :  (BaseStyles.fonts.sm+BaseStyles.fonts.md) * 0.45 ,
            color : accentColor
        }
        return (
            <View style={styles.pageStyle}>
                <Text style={textStyle}>
                    For example, if the secret word is TEAM, the guesses and hints are as follows,
                </Text>
                <View style={[pageStyle2.guess,{borderColor : accentColor}]}>
                    <View style={pageStyle2.guessRow}>
                        <View style = {pageStyle2.guessWord}>
                            <Text style={textStyle}>COIN</Text>
                        </View>
                        <View style = {pageStyle2.guessResult}>
                            <CustomIcon name = {"crosshair"} size = {36} color={accentColor}/>
                            <Text style={textStyle}> : 0</Text>
                        </View> 
                        <View style = {pageStyle2.guessResult}>
                            <CustomIcon name = {"bullseye"} size = {36} color={accentColor}/>
                            <Text style={textStyle}> : 0</Text>
                        </View> 
                    </View>
                    <Text style={bracketTextStyle}>(all of the guessed letters are wrong)</Text>
                </View>

                <View style={[pageStyle2.guess,{borderColor : accentColor}]}>
                    <View style={pageStyle2.guessRow}>
                        <View style = {pageStyle2.guessWord}>
                            <Text style={textStyle}>MART</Text>
                        </View>
                        <View style = {pageStyle2.guessResult}>
                            <CustomIcon name = {"crosshair"} size = {36} color={accentColor}/>
                            <Text style={textStyle}> : 3</Text>
                        </View> 
                        <View style = {pageStyle2.guessResult}>
                            <CustomIcon name = {"bullseye"} size = {36} color={accentColor}/>
                            <Text style={textStyle}> : 0</Text>
                        </View> 
                    </View>
                    <Text style={bracketTextStyle}>(since M,A,T are all present, but not in the right position)</Text>
                </View>

                <View style={[pageStyle2.guess,{borderColor : accentColor}]}>
                    <View style={pageStyle2.guessRow}>
                        <View style = {pageStyle2.guessWord}>
                            <Text style={textStyle}>HEAT</Text>
                        </View>
                        <View style = {pageStyle2.guessResult}>
                            <CustomIcon name = {"crosshair"} size = {36} color={accentColor}/>
                            <Text style={textStyle}> : 1</Text>
                        </View> 
                        <View style = {pageStyle2.guessResult}>
                            <CustomIcon name = {"bullseye"} size = {36} color={accentColor}/>
                            <Text style={textStyle}> : 2</Text>
                        </View> 
                    </View>
                    <Text style={bracketTextStyle}>(since E and T are in the same position as the secret word, while T is in the wrong position)</Text>
                </View>

            </View>
        )
    }
}

const RenderPageCircle = (props) => {
    const containerStyle = {
        padding : BaseStyles.padding.sm * 0.5,
    }

    if(props.item.valueOf()==props.currentPage){
        return (
            <View style={containerStyle}>
                <Icon name="circle" solid color={props.accentColor}
                    type="font-awesome" size={15}  />
            </View>

        )
    }
    else{
        return (
            <View style={containerStyle}>
                <Icon name="circle" color={props.accentColor}
                    type="font-awesome" size={15}  />
            </View>

        )
    }

}
function HowToPlayComponent(props){

    const theme = useSelector(state => state.theme)
    const accentColor = theme.colors.accent
    const [currentPage,setCurrentPage] = useState(1);
    const {onClosePress} = props
    const closeButtonSize = BaseStyles.dimensions.fullWidth * 0.07;
    const pageCircleArray = ['1','2']

    const panResponder = React.useMemo( () => PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: (evt, gestureState) => {

        },
        onPanResponderMove: (evt, gestureState) => {
            // console.log("=============")
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, {vx,dx}) => {
            
            if(dx > 40){
                console.log(" [ HowToPlayComponen.js] Swipe Right Detected ")
                setCurrentPage(1)
            }
            else if (dx < -40){
                console.log(" [ HowToPlayComponen.js] Swipe Left Detected ")
                setCurrentPage(2)
            }

        },
        onPanResponderTerminate: (evt, gestureState) => {
    
        },
    }), [] );
    return (
        <Modal
            visible={props.displayHowToPlay}
            transparent = {true}
            animationType = {"fade"}> 

                <Animated.View style={styles.outerContainerStyle} {...panResponder.panHandlers} >
                    <View style={[styles.containerStyle,{backgroundColor : theme.colors.primaryDark}]}>
                        <View style={styles.titleRow}>
                            <View style={styles.closeButtonContainerStyle}></View>

                            <View style={styles.headerTextContainerStyle}>
                                <Text style={[styles.headerTextStyle,{color : theme.colors.accent}]}>How To Play</Text>
                            </View>

                            <View style={styles.closeButtonContainerStyle}>
                                <TouchableOpacity onPress={() => {
                                    onClosePress()
                                    setCurrentPage(1)}
                                    }>
                                    <Icon color={theme.colors.accent} name="times-circle" 
                                            type="font-awesome" size={closeButtonSize}
                                        />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.contentRow,{backgroundColor : theme.colors.primaryDark}]}>
                            {PageContent(currentPage,accentColor)}
                        </View>

                        <View style={[styles.pageCircleRow,{backgroundColor : theme.colors.primaryDark}]}>

                            <View>
                                <View>
                                    <FlatList
                                        horizontal = {true}
                                        data = {pageCircleArray}
                                        keyExtractor = { (item) => item}
                                        renderItem = {
                                            ({item}) => <RenderPageCircle item={item} currentPage={currentPage} accentColor={accentColor}/>
                                        } />
                                </View>

                            </View>

                        </View>
                    </View>
                </Animated.View> 

        </Modal>
    )
}

const styles = StyleSheet.create({
    outerContainerStyle : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000088'
    },
    containerStyle : {
        flexDirection : "column",
        height : "85%",
        width : "85%",
        padding : BaseStyles.padding.sm,
        borderRadius : BaseStyles.borderRadius.radiusMd
    },
    titleRow : {
        flex : 1,
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : "center",
    },
    headerTextContainerStyle : {
        flex : 9,
        justifyContent : "center",
        alignItems : "center"
    },
    closeButtonContainerStyle : {
        flex : 1,
        marginTop : (-1 * BaseStyles.margin.lg) ,
        alignItems : "flex-end",
    },
    contentRow : {
        flex : 8,
    },
    pageCircleRow : {
        flex : 1,
        flexDirection : 'row',
        justifyContent:'space-evenly',
        alignItems : 'center',
    },
    headerTextStyle : {
        fontSize : BaseStyles.fonts.md,
        fontWeight : "bold"
    },
    
    pageStyle : {
        height : "100%",
        padding : BaseStyles.padding.md
    },

})

const pageStyle1 = StyleSheet.create({
    topPage : {
        flex : 6,
        paddingVertical : BaseStyles.padding.md,
        justifyContent : "flex-start",
    },
    
    bottomPage : {
        flex : 4,
    },

    bottomRow : {
        flex : 2,
        flexDirection : "row",
        padding : BaseStyles.padding.sm
    },

    iconView : {
        flex : 3,
        justifyContent : "center"
    },
    
    iconExplanation : {
        flex : 9,
        justifyContent : "center",
    }
})

const pageStyle2 = StyleSheet.create({
    guess : {
        borderWidth : 1,
        padding : BaseStyles.padding.sm,
        margin : BaseStyles.margin.sm,
        borderRadius : BaseStyles.borderRadius.radiusLg,
    },
    guessRow : {
        flexDirection : "row",
        justifyContent : "center",

    },
    guessWord : {
        flex : 4,
        justifyContent : "center",
    },
    guessResult : {
        flex : 3,
        flexDirection : 'row',
        justifyContent : "center",
        alignItems : "center"
    }
})
export default HowToPlayComponent;