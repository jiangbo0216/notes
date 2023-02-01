// const http = require('http')

// http.createServer()


const http = require('http');

const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
   

    if(req.path == '/sugrec') {
 //用于存放get / post数据 
 res.end(`
    
 <!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Document</title>
</head>
<body>
 <div class="main">hello world</div>
</body>
</html>
 `)
    }
})


server.listen(8080, () => {
    console.log('服务器开启成功！')
});