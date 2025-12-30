let mySocket = new WebSocket(
  'wss://javascript.info/article/websocket/demo/hello',
  ['soap', 'wamp']
)

mySocket.onopen = function (e) {
  console.log('Соединение установлено')

  mySocket.send('Hello!!!')
  // mySocket.send(JSON.stringify({ type: 'join', room: 'general' }))
}

console.log(mySocket.readyState) // CONNECTING до рукопожатия
console.log(mySocket.readyState) // OPEN после рукопожатия

mySocket.onmessage = function (event) {
  // const data = JSON.parse(event.data)
  // console.log('Получено сообщение:', data)
  console.log(`Получено сообщение, ${event.data} `)
}

mySocket.onclose = function (event) {
  console.log(`Соединение закрыто: код ${event.code}, причина ${event.reason}`)
}

mySocket.onerror = function (error) {
  alert(`[error]`)
}
