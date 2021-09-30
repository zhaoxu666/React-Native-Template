import Types from '../../action/types'
const defaultState = {
  num: 0,
  text: 'TEXT'
};
export default function counter (state = defaultState, action) {
  switch (action.type) {
    case Types.INCREMENT:
        return {
            ...state,
            num: state.num + 1
        }
    case Types.DECREMENT:
        return {
            ...state,
            num: state.num - 1
        }
    case Types.TEXT_CHANGE:
      return {
        ...state,
        text: action.text
      }
    default:
        return state;
  }
}