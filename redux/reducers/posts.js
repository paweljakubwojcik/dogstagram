import { FETCH_POSTS, INCREMENT_INDEX } from '../constants'
import reduceArrayIntoObject from '../../util/methods/reduceArrayIntoObject'

const initialState = {
    posts: [],
    daysBackIndex: 1,
}

export const postState = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            const existing = reduceArrayIntoObject(state.posts)
            const incoming = reduceArrayIntoObject(action.payload)
            const merged = {
                ...existing,
                ...incoming,
            }
            return { ...state, posts: Object.values(merged) }
        case INCREMENT_INDEX:
            return { ...state, daysBackIndex: state.daysBackIndex + 1 }
        default:
            return state
    }
}
