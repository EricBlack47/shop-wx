module.exports = {
  publicPath: './',
	lintOnSave:false,
  devServer: {
		port: 9528,
		open: true,
		overlay: {
		  warnings: false,
		  errors: true
		},
    proxy: {
        '/api': {
             //target: 'http://mtlyn.cn',
						 target:'http://192.168.101.81:8080',
            changeOrigin: true,
            ws: false,
            pathRewrite: {
              '^/api': '/api'
            }
        }
    }
  }
};
