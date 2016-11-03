const   express = require('express'),
        bodyParser = require('body-parser'),
        Student = require('./mongoose'),
        template = require('art-template')
        
const app = express()


template.config('cache', false)

app.engine('html', template.__express)
app.set('view engine', 'html')


app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended: true}))


// 使用路由（模块化）技术将代码分散到多个文件中
// 好处是：
// 1.每个文件中的代码都很少，便于阅读和修改
// 2.将代码分散不同的文件中可以多人同时开发
app.use('/api/index', require('./routes/api/index'))
app.use('/api/student', require('./routes/api/student'))
app.use('/edit', require('./routes/edit'))
app.use('/add', require('./routes/add'))
//在add.js里的路由前面都加上'/add'



app.listen(3000, () => console.log('正在运行...'))