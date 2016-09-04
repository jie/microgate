if (process.env.NODE_ENV === 'production') {
  module.exports = require('./settings.prod')
} else {
  module.exports = require('./settings.dev')
}
