module.exports = {
    devServer: {
        compress: true,
        port: 9000,
        proxy: {
            '/users': {
                target: 'http://localhost:3000/users',
                pathRewrite: {'^/users' : ''}
            }
        }
    }
}