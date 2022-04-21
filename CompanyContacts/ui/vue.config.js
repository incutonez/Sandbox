// https://stackoverflow.com/questions/51844289/turn-off-hot-reload-on-project-started-with-vue-cli-3-webpack-4-15-1
module.exports = {
  devServer: {
    hot: false,
    liveReload: false
  },
  css: {
    loaderOptions: {
      // Taken from https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
      scss: {
        additionalData: `@import "@/sass/var/globals.scss";`
      }
    }
  }
};
