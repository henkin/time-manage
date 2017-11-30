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
      { rel: 'stylesheet', href: 'https://bootswatch.com/4/darkly/bootstrap.css' }
    ]
  },
  env: {
    HOST_URL: process.env.HOST_URL || 'http://localhost:3000'
  },
  modules: [
    'bootstrap-vue/nuxt',

    // Or if you have custom bootstrap CSS...
    ['bootstrap-vue/nuxt', { css: false }]
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['socket.io-client'],

    /*
    ** Run ESLint on save
    */
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
}
