export default {
    getNowMusicMenu(state) {
        if (state.nowmusicmenu.al === undefined) {
            return {
                al: {
                    picUrl: require('assets/img/common/logo.png'),
                    name: '歌名',
                    pic: 0,
                    id: 0,
                },
                ar: [{
                    id: 0,
                    name: '歌手'
                }],
                dt: 0,
            }
        } else {
            return state.nowmusicmenu;
        }
    },
}