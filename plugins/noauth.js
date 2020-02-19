module.exports = function (opts) {
  var remote = ''

  return {
    name: 'noauth',
    create: function (_opts) {
      return function (stream, cb) {
        cb(null, {
          remote: new Buffer(remote, 'base64'),
          auth: { allow: null, deny: null },
          source: stream.source,
          sink: stream.sink,
          address: 'noauth:' + remote
        })
      }
    },
    parse: function (str) {
      var ary = str.split(':')
      if(ary[0] !== 'noauth') return null

      remote = ary[1].substr(0, ary[1].length-8)

      return {}
    },
    stringify: function () {
      return 'noauth'
    }
  }
}
