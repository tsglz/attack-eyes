module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'ios >= 8']
    },
    'postcss-pxtorem': {
      rootvalue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']

    }
  }
}

