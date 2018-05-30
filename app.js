const express = require('express');
const app = express();

// 静态文件托管
app.use(express.static('./'));

// 首页路由
app.get('/',(req,res) => {
	res.sendFile(__dirname + '/' + 'index.html');
});

app.listen(3000,() => {
	console.log('app is running at: localhost:3000');
});





