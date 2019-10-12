var ws = require("nodejs-websocket")
var http = require("http");
var fs = require("fs")

var server = http.createServer(function (req, res) {
    var html = fs.readFileSync('./index.html')
    res.end(html)
}).listen(80)

console.log("开始建立连接. . .")
var message = undefined
var server = ws.createServer(function (connection) {
    console.log(connection.headers.host)
    console.log("Welcome to join us.")
    connection.on("text",function (str) {
        console.log(str)
        server.connections.forEach(function (connection) {
            connection.sendText(str)
        })
    })
    connection.on("close",function (code, reason) {
        console.log("客户端已关闭！")
    })
    connection.on("error",function (code, reason) {
        console.log("异常关闭！")
    })
}).listen(8080)

console.log("Websocket 建立完毕。")