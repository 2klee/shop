// 원래는 이거 없으면 axios 불러오기 안되야 하는데 지금 너무 잘됨. 서버가 열려있었다고 함.

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        "/shop/master/src/**",
        createProxyMiddleware( {
            target: 'https://raw.githubusercontent.com/2klee',
            changeOrigin: true
        })
    )
};