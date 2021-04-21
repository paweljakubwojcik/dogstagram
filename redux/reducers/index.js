import { combineReducers } from 'redux'
import { users } from './users'
import { postState } from './posts'

const Reducers = combineReducers({
    usersState: users,
    postState,
})

export default Reducers
