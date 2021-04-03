import { combineReducers } from 'redux'
import { user } from './user'
import { users } from './users'
import { posts } from './posts'

const Reducers = combineReducers({
    userState: user,
    usersState: users,
    posts,
})

export default Reducers
