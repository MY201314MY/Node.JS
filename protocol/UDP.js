var dgram = require("dgram")
var server = dgram.createSocket("udp4")
server.on("message", function (msg, rinfo) {
    console.log("已接收到客户端数据。" + msg)
    console.log("地址信息%j", rinfo)
    var buf = new Buffer(msg)
    server.send(buf,0,buf.length,rinfo.port,rinfo.address)
})

server.on("listening",function () {
    var address = server.address()
    console.log("服务器开始监听，地址信息为%j",address)
})

server.bind(8888,"localhost")