const title = 'בניין חכם';
const description = 'אפליקציה לפתיחת מחסום חניה';

export default {
    head: {
        title: title,
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {property: 'og:title', content: title},
            {property: 'twitter:title', content: title},
            {property: 'og:description', content: description},
            {property: 'twitter:description', content: description},
            {property: 'og:image', content: 'preview.png'},
            {property: 'twitter:image', content: 'preview.png'},
            {name: 'viewport', content: 'width=device-width,initial-scale=1.0'},
            {"http-equiv": 'X-UA-Compatible', content: 'IE=edge'},
            {hid: 'description', name: 'description', content: ''},
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.svg'}
        ]
    },
    server: {
        host: '0'
    },
    ssr: false,
    target: 'static',
    css: [],
    plugins: [],
    components: true,
    buildModules: [],
    modules: [
        '@nuxtjs/axios',
    ],
    axios: {
        baseURL: '/',
    },
    build: {}
}