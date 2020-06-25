import * as React from 'react';
import { View } from 'react-native';
import Icon from '../CustomIconComponent'
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';

function LogoComponent(props){
    const logoSize = (BaseStyles.dimensions.fullWidth * 0.2);
    const theme = useSelector(state => state.theme);
    return (
        <View>
            <Icon name = "logo" size = {logoSize} style = {{color : theme.colors.accent}} />
        </View>
    )
}

export default LogoComponent;