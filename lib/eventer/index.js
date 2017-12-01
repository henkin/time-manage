const r = require('rethinkdbdash')()
let subscribers = {}

function socketServerInit (client) {

  client.on('subscribe', (tableName) => {
    r.db().table(tableName)
    //.filter(query.filter)
    //   .orderBy({
    //     index: r.desc('age')
    //   })
    //   .filter({
    //     eyeColor: 'brown'
    //   })
    //   .limit(40)
      .changes()
      .run({
        cursor: true
      }, (err, cursor) => {
        if (err) {
          console.log(err)
        } else {
          if (cursor) {
            cursor.each(function (err, record) {
              if (err) {
                console.log(err)
              } else {
                console.log('CHANGES', record)
                io.sockets.socket(client.id).emit('data', { tableName, record } )
              }
            })
          }
        }
      })
    // socket.on(modelName + ':changes:stop', stopCursor);
    client.on('disconnect', stopCursor)

    function stopCursor () {
      if (cursor) {
        cursor.close()
      }
      //socket.removeListener(modelName + ':changes:stop', stopCursor);
      client.removeListener('disconnect', stopCursor)
    }
  })
}


module.exports = {
  socketServerInit: socketServerInit
}
