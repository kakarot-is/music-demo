import { USER_SONGLIST } from './mutationType'
export default {
    [USER_SONGLIST](state, list) {
        state.userPlayList = [...list];
    }
}