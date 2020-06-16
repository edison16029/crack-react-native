import * as React from 'react';
import { Component } from 'react';
import { View,Text } from 'react-native';
import * as Themes from '../styles/themes';
import { connect } from 'react-redux';
import { setTheme } from '../redux/actionCreators';


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
    }

    componentDidMount(){
        this.props.setTheme(Themes.jungleTheme)
    }
    render() {
        const containerStyle = {
            flex : 1,
            backgroundColor : this.props.theme.colors.primaryDark
        }
        return (
            <View style={containerStyle}>
                <Text>Home Component</Text>
            </View>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent);