import * as React from 'react';
import { Component } from 'react';
import { View,Text } from 'react-native';
import * as Themes from '../styles/themes';
//Redux
import { connect } from 'react-redux';
import { setTheme } from '../redux/actionCreators';
//Presentational Components
import AppBarComponent from './presentationalComponents/AppBarComponent'; 
import HomeCardComponent from './presentationalComponents/HomeCardComponent';
import ButtonComponent from './presentationalComponents/ButtonComponent';



const mapStateToProps = (state) => {
    return {
        theme : state.theme
    }
}

const mapDispatchToProps = (dispatch) => ({
    setTheme : (theme) => dispatch(setTheme(theme))
})

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.onPlayPress = this.onPlayPress.bind(this);
    }

    componentDidMount(){
        this.props.setTheme(Themes.jungleTheme)
    }

    onPlayPress() {
        const { navigation } = this.props;
        console.log(" [HomeComponent.js ] " + "Play Pressed");
        navigation.navigate('Game');
    }
    render() {
        const containerStyle = {
            flex : 1,
            backgroundColor : this.props.theme.colors.primaryDark,
            alignItems : "center"
        }
        return (
            <View style={containerStyle}>
                <AppBarComponent />
                <HomeCardComponent />
                <View style={{flex : 0.5,alignItems:'center',justifyContent:'space-evenly'}}>
                    <ButtonComponent onPress={this.onPlayPress}/>
                </View>

            </View>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent);