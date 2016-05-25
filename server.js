const   express = require('express'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        template = require('art-template')
        
const app = express()

template.config('cache', false)
app.engine('html', template.__express)
app.set('view engine', 'html')


app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended: true}))

// 连接数据库
mongoose.connect('mongodb://localhost/zy-students')
// 获取当前数据库连接
const db = mongoose.connection

// 监听数据库连接事件
db.on('error', err => console.error('数据连接失败：', err))
db.on('open', () => console.log('打开数据库连接'))

// mongoose.model()创建一个数据模型（类或构造函数）
// mongoose为MongoDB增加了很多很强大的功能
// 大部分功能以model为基础
// 第1个参数：模型的名称，也是数据库中集合的名称
// 第2个参数：Schema，模式，描述了数据的形状，即
// 数据中有哪些属性，属性的类型，属性的默认值，属性的验证等
const Student = mongoose.model('students', {
    name: String,
    age: Number,
    isMale: Boolean,
    phone: String,
    email: String,
    description: String,
    ip: String,
    createTime: Date,
    updateTime: Date
})

// 创建一个模型的实例，模型实例中存放是数据
// 模型提供了数据的增、删、改、查等方法
// const student = new Student({
//     name: '常伟',
//     age: 6,
//     isMale: true,
//     phone: '18638273637',
//     email: 'changw.cn@qq.com'
// })

// // 保存数据
// student.save(err => {
//     if(err){
//         console.error('保存数据错误：', err)
//     }
//     else{
//         console.log('保存成功！')
//     }
// })


app.post('/api/student/add', (req, res) => {
    req.body.ip = req.ip
    req.body.createTime = new Date()
    req.body.updateTime = req.body.createTime
    
    console.log(req.body)
    
    new Student(req.body).save(err => {
        if(err){
            res.json({code: 'error', message: '系统错误'})
        }
        else{
            res.json({code: 'success', message: '成功！'})
        }
    })
})


app.get('/', (req, res) => {
    // select对数据属性进行筛选，属性名之间用空格分隔
    Student.find().select('name isMale age phone email').exec((err, data) => {
        
        if(err){
            //跳转到错误页
        }
        else{
            // data是一个model数组
            // model.toObject()可以将数据从模型实例中剥离出来
            // console.dir(data)
            console.dir(data.map(m => m.toObject()))
            

            res.render('index', {students: data.map(m => {
                m = m.toObject()
                m.id = m._id.toString()
                delete m._id
                return m
            })})
        }
    })
})


app.post('/api/student/remove/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, err => {
        if(err){
            res.json({code: 'error', message: '系统错误'})
        }
        else{
            res.json({code: 'success', message: '成功！'})
        }
    })
})

app.listen(3000, () => console.log('正在运行...'))