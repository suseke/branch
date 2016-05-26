const mongoose = require('mongoose')

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


module.exports = Student