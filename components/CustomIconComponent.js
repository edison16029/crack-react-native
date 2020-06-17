import {createIconSetFromFontello} from '@expo/vector-icons'
import FontelloConfig from '../config.json'
const expoAssetId = require("../assets/fonts/crack-icons.ttf");
const Icon = createIconSetFromFontello(FontelloConfig, 'crack-icons', 'crackIcons')

export default Icon