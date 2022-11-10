module.exports = {
  devServer: {
    proxy: {
      '/api': {
        headers: { 'Access-Control-Allow-Origin': '*' },
        target: 'http://localhost:8080',
        changeOrigin: true // cross origin 허용
      }
    }
  }

}
