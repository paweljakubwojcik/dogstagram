import {
    CURRENT_USER_STATE_CHANGE,
    USER_FOLLOWING_STATE_CHANGE,
    USERS_DATA_STATE_CHANGE,
} from '../constants'

const initialState = {
    users: {},
    currentUser: {
        following: [],
    },
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.payload,
            }
        case USER_FOLLOWING_STATE_CHANGE:
            if (action.payload.uid === state.currentUser.uid)
                return {
                    ...state,
                    currentUser: { ...state.currentUser, following: action.payload.following },
                }
            // probably wont be used but anyway ;)
            else
                return {
                    ...state,
                    users: {
                        ...state.users,
                        [uid]: { ...state.users[uid], following: action.payload.following },
                    },
                }
        case USERS_DATA_STATE_CHANGE:
            return {
                ...state,
                users: { ...state.users, [action.user.uid]: action.user },
            }
        default:
            return state
    }
}
