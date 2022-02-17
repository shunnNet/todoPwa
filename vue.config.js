module.exports = {
  publicPath: '/todoPwa',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: /\.js$/,
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/_env.scss";`,
      },
    },
  },
}
