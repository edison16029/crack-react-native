import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as BaseStyles from '../../styles/base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CustomIcon from '../CustomIconComponent'
import  Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SoundAndVibrate from '../../shared/SoundAndVibrate'

const mapStateToProps = (state) => {
    return {
        theme : state.theme
    }
}

class WinnerScreenComponent extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(this.props.isSurrender)
            SoundAndVibrate.play('giveup', this.props.theme.sound)
        else 
            SoundAndVibrate.play('cracked', this.props.theme.sound)
    }

    render() {
        
        const cardContainer = StyleSheet.flatten([
            styles.cardContainer,
            {backgroundColor : this.props.theme.colors.primaryDark}

        ])
        const font = StyleSheet.flatten([
            styles.font,
            {color : this.props.theme.colors.accent}
        ])
        const iconButton = StyleSheet.flatten([
            styles.iconButton,
            {borderColor : this.props.theme.colors.accent,
            backgroundColor : this.props.theme.colors.primary,},
        ])
        const iconSize = BaseStyles.dimensions.fullWidth * 0.06
        const iconStyle = {color : this.props.theme.colors.accent}
        const bannerSize = BaseStyles.dimensions.fullWidth * 0.26

        const banner = () => {
            if(this.props.isSurrender){
                //SoundAndVibrate.play('giveup', theme.sound, theme.vibrate)
                return (
                    <CustomIcon name = {"giveupbanner"} size = {bannerSize} style = {iconStyle}/>
                )
            }
            else{
                //SoundAndVibrate.play('cracked', theme.sound, theme.vibrate)
                return (
                    <CustomIcon name = {"winnerbanner"} size = {bannerSize} style = {iconStyle}/>
                )
            }
        }
            

        return (
            <View style = {cardContainer}>
                <Text style = {font}>{this.props.guess}</Text>
                {banner()}
                <View style = {styles.iconRow} >
                    <TouchableOpacity style = {iconButton} onPress = {this.props.handleHomeButtonPress}>
                        <Icon name = "home" type = "font-awesome" size = {iconSize} style = {iconStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {iconButton} onPress = {this.props.handleRestartButtonPress}>
                        <Icon name = "redo" type = "font-awesome" size = {iconSize} style = {iconStyle} /> 
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer : {
        flex : 3,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : BaseStyles.margin.sm,
        marginBottom : BaseStyles.margin.md,
        marginHorizontal : BaseStyles.margin.xl,
        borderRadius : BaseStyles.borderRadius.radiusLg,
        elevation : 5,    
    },
    font : {
        fontSize : BaseStyles.fonts.lg,
        fontFamily : BaseStyles.fonts.primary,
        textAlign : 'center',
        textTransform : 'uppercase'
    },
    iconRow : { 
        width : `60%`, 
        flexDirection : 'row', 
        justifyContent : 'center', 
        alignItems : 'center',
        paddingTop : BaseStyles.padding.md
    },
    iconButton : {
        width : BaseStyles.dimensions.fullWidth * 0.11,
        height : BaseStyles.dimensions.fullWidth * 0.11,
        justifyContent : 'center',
        alignItems : 'center',
        margin : BaseStyles.margin.sm,
        borderRadius : (BaseStyles.dimensions.fullWidth*0.11)/2,
        borderWidth : 2.5,
        elevation : 5,
    },
});


WinnerScreenComponent.propTypes = {
    guess : PropTypes.string.isRequired,
    handleHomeButtonPress : PropTypes.func.isRequired,
    handleRestartButtonPress : PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(WinnerScreenComponent)