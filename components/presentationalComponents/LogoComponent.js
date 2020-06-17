import * as React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5' ;
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';

function LogoComponent(props){
    const logoSize = (BaseStyles.dimensions.fullWidth *0.85 ) * 0.60;
    const theme = useSelector(state => state.theme);
    return (
        <View>
            <Icon color={theme.colors.accent} name="robot" type="font-awesome" size={logoSize}/>
        </View>
    )
}

export default LogoComponent;