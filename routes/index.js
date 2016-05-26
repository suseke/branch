const   express = require('express'),
        Student = require('../mongoose')
        
const route = express.Router()

/*------------------------
/:page表示/后必须有字符
/(:page)?表示/后可以有字符，也可以没有字符
有字符串时可以通过page得到，没有字符时page是
undefined
-------------------------*/
route.get('/(:page)?', (req, res) => {
    
    var page = req.params.page
    page = page || 1
    
// page是undefined时，(page || 1)是1
// page是数字时，(page || 1)是page
    
    page = parseInt(page)
    page = page < 1 ? 1 : page
    
    //每页显示5条数据
    var pageSize = 5

    Student.find().count((err, total) => {
        console.log(total)
        
        if(err){
            // 跳转到错误页
        }
        else{
            // 如果total / pageSize除不尽（小数），需向上取整
            var pageCount = Math.ceil(total / pageSize)
            
            // select对数据属性进行筛选，属性名之间用空格分隔
            Student.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .select('name isMale age phone email')
            .exec((err, data) => {
                if(err){
                    //跳转到错误页
                }
                else{
                    // data是一个model数组
                    // model.toObject()可以将数据从模型实例中剥离出来
                    // console.dir(data)
                    // console.dir(data.map(m => m.toObject()))

                    res.render('index', {page, pageCount, students: data.map(m => {
                        m = m.toObject()
                        m.id = m._id.toString()
                        delete m._id
                        return m
                    })})
                }
            })
        }
    })
})


module.exports = route