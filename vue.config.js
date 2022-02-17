module.exports = {
  publicPath: '/todoPwa',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: /\.js$/,
    },
    manifestPath: '/manifest.json',
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/_env.scss";`,
      },
    },
  },
}
