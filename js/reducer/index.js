import { combineReducers } from 'redux';
import theme from './theme'
import home from './home'
/**
 * 合并reducer
 */
const index = combineReducers({
    theme: theme,
    home: home
})

export default index