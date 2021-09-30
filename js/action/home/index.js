import Types from '../types'

export function addTodo (num) {
    return {
        type: Types.INCREMENT,
        num: num
    }
}

export function decTodo (num) {
    return {
        type: Types.DECREMENT,
        num: num
    }
}

export function textChange (text) {
    return {
        type: Types.TEXT_CHANGE,
        text: text
    }
}