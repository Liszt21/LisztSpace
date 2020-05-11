module.exports = {
    outputDir: 'dist',
    assetsDir: '',
    devServer: {
        open: false,
        https: false,
        hotOnly: false,
        proxy: {
            '/juhe': {
                target: 'http://v.juhe.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/juhe': '',
                }
            },
            '/api': {
                target: "http://localhost:5000",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api',
                }
            }
        },
        before: app => {}
    },
}