module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'time-manage',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Time Management using Vue' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://bootswatch.com/4/darkly/bootstrap.css' }
    ]
  },
  env: {
    HOST_URL: process.env.HOST_URL || 'http://localhost:3000'
  },
  modules: [
    'bootstrap-vue/nuxt',
    // Or if you have custom bootstrap CSS...
    // 'nuxt-oauth',
    ['bootstrap-vue/nuxt', { css: false }]
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  build: {
    vendor: ['socket.io-client'],
    /*    ** Run ESLint on save    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [
    '~/api/index.js'
  ]
  // oauth: {
  //   sessionName: 'appSession',
  //   secretKey: 'devKey', // process.env.SECRET_KEY,
  //   oauthHost: 'https://accounts.google.com', // https://accounts.google.com/o/oauth2/v2/auth // process.env.OAUTH_HOST,
  //   oauthClientID: '7655171871-2fgmpiqne0q2tr38g605aad8v35nglqg.apps.googleusercontent.com', // process.env.OAUTH_CLIENT_ID,
  //   oauthClientSecret: 'x0Ygh0I7RiiIB59NtfXS-NWM', // process.env.OAUTH_CLIENT_SECRET,
  //   onLogout: (req, res) => {
  //     // do something after logging out
  //     console.warn('logged out')
  //   },
  //   fetchUser: (accessToken) => {
  //     // do something to return the user
  //     // const user = User.findByToken(accessToken)
  //     // return user
  //     console.log('fetchUser')
  //     return {};
  //   }
  // }
}
