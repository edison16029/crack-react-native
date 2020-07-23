import { Dimensions } from 'react-native'

export const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}
    
export const defaultColors  = {
    primary: '#52575C',
    primaryDark: '#353535',
    accent: '#FFFFFF',
}

export const padding = {
    xs : (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 5,
    sm: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 8,
    md: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 16,
    lg: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 32,
    xl: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 40
}

export const margin = {
    xs : (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 5,
    sm: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 8,
    md: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 16,
    lg: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 32,
    xl: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 40
}

export const fonts = {
    sm: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 18,
    md: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 24,
    lg: (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 36,
    spacingSm: 15,
    spacingLg: 20,
    lineHeightSm : 24,
    primary: 'Roboto'
}

export const borderRadius = {
    radiusSm : (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 8,
    radiusMd : (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 16,
    radiusLg : (dimensions.fullHeight/dimensions.fullWidth) * 0.46 * 24,
} 



