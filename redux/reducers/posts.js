import { FETCH_POSTS } from '../constants'

const initialState = []

export const posts = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            const existing = reduceArrayIntoObject(state)
            const incoming = reduceArrayIntoObject(action.payload)
            const merged = {
                ...existing,
                ...incoming,
            }
            return Object.values(merged)
        default:
            return state
    }
}

function reduceArrayIntoObject(array) {
    return array.reduce((objectFromArray, value) => {
        return {
            ...objectFromArray,
            [value.id]: value,
        }
    }, {})
}
