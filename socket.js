var net = require('net')

var server = net.createServer(function (socket) {
    console.log("连接成功！")
    console.log("The information of the client:")
    console.log(socket.address())
    server.getConnections(function (error, count) {
        console.log("当前有%d个客户端在连接",count)
        socket.write("Welcome to us.")
    })
    socket.on('data',function (data) {
        console.log(data.toString())
        socket.write("This is a message form Node.js Server!")
        console.log("Received %d bytes",socket.bytesRead)
    })
    socket.on('end',function () {
        console.log("客户端已被关闭")
    })
})

server.listen(8888,function () {
    console.log("客户端开始监听。")
})