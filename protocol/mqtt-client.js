const mqtt = require('mqtt');
const options = {
    keepalive: 60,
    clientId: '47975479',
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    username: '179383',
    password: 'r6VsaTGQVMeYmOujP4xkHFVCXvo=',
    rejectUnauthorized: false
}
let hostName = 'mqtt.heclouds.com';
let port = '6002';
if (this.client) {
    this.client.end();
}
const client = mqtt.connect(`mqtt://${hostName}:${port}`, options);
client.on('connect', function () {
    console.log("连接成功--")
    client.subscribe('BC20', function (err) {
        console.log("订阅成功!");
    })
})
client.on('message', function (topic, message) {
    console.log(topic.toString())
    console.log(message.toString())
})
client.on('error', function (err) {
    console.log("连接失败...")
    client.end();
})
client.publish('iPhone', 'Hello,world.');
let clientReconnectTime = 0;
client.on('reconnect', () => {
    clientReconnectTime++;
    // 重连三次断开
    if (clientReconnectTime > 2) {
        client.end();
    }
})
