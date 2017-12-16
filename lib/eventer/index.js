const r = require('rethinkdbdash')()

function socketServerInit (client) {
  console.log('socket connected: ' + client.id)

  client.on('disconnect', () => {
    console.log('socket disconnected: ' + client.id)
  })

  client.on('subscribe', (tableName) => {
    r.table(tableName)
    //.filter(query.filter)
    //   .orderBy({
    //     index: r.desc('age')
    //   })
    //   .filter({
    //     eyeColor: 'brown'
    //   })
    //   .limit(40)
      .changes()
      .run({ cursor: true }, (err, cursor) => {
        if (err) {
          console.log(err)
        } else {
          if (cursor) {
            cursor.each(function (err, record) {
              if (err) {
                console.error('error iterating cursor', err)
              } else {
                console.log(`${tableName} changes:`, record)
                //io.sockets.socket(client.id).emit('data', { tableName, record } )
                client.emit('data', {tableName, record})
              }
            })
          }
        }

        client.on('disconnect', stopCursor)

        function stopCursor () {
          if (cursor) {
            cursor.close()
          }
          //socket.removeListener(modelName + ':changes:stop', stopCursor);
          client.removeListener('disconnect', stopCursor)
        }
      })
    // socket.on(modelName + ':changes:stop', stopCursor);
    // client.on('disconnect', stopCursor)
    //
    // function stopCursor () {
    //   if (cursor) {
    //     cursor.close()
    //   }
    //   //socket.removeListener(modelName + ':changes:stop', stopCursor);
    //   client.removeListener('disconnect', stopCursor)
    // }
  })
}

module.exports = {
  socketServerInit: socketServerInit
}
