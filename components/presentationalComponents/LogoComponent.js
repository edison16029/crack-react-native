import * as React from 'react';
import { View } from 'react-native';
import Icon from '../CustomIconComponent'
import * as BaseStyles from '../../styles/base';
import { useSelector } from 'react-redux';

function LogoComponent(props){

    const defaultLogoSize = (BaseStyles.dimensions.fullWidth * 0.3);
    const logoSize = props.size == null ? defaultLogoSize : props.size;
    const theme = useSelector(state => state.theme);
    return (
        <View>
            <Icon name = "logo" size = {logoSize} style = {{color : theme.colors.accent}} />
        </View>
    )
}

export default LogoComponent;