const http = require('http')

http
  .createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Request-Method', '*')
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
    response.setHeader('Access-Control-Allow-Headers', '*')

    if (request.method === 'OPTIONS') {
      response.writeHead(200)
      response.end()
      return
    }

    console.log('last-event-id', request.headers['last-event-id'])

    response.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    })

    let id = request.headers['last-event-id']
      ? Number(request.headers['last-event-id']) + 1
      : 1

    // Send event every 3 seconds or so forever...
    const interval = setInterval(() => {
      response.write(
        `event: myEvent\nid: ${id}\ndata:${JSON.stringify({
          a: 1,
          b: {},
        })}`
      )
      response.write('\n\n')
      id++
    }, 3000)

    request.on('close', () => {
      clearInterval(interval)
      response.end()
      console.log('Stopped sending events as client closed the connection.')
    })
  })
  .listen(5000)
