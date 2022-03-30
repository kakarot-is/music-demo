export default {
    routes: [
        {
            path: '/',
            redirect: '/home/rtstyle',
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "about" */ '../views/Home/Home.vue'),
            children: [
                {
                    path: 'rtstyle',
                    name: 'style',
                    // component
                }
            ]

        }
    ],
    // mode: 'history'
}