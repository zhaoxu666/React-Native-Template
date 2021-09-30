import Types from '../types'

export function onThemeChagne(theme) {
    return {
        type: Types.THEME_CHANGE, theme: theme
    }
}