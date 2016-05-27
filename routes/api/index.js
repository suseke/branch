const   express = require('express'),
        Student = require('../../mongoose')
        
const route = express.Router()

route.post('/(:page)?', (req, res) => {
    
    var page = req.params.page
    page = page || 1
    
    page = parseInt(page)
    page = page < 1 ? 1 : page
    
    var pageSize = 5

    Student.find().count((err, total) => {
        console.log(total)
        
        if(err){
            res.json({code: 'error', message: '系统错误！'})
        }
        else{
            var pageCount = Math.ceil(total / pageSize)
            
            Student.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .select('name isMale age phone email')
            .exec((err, data) => {
                if(err){
                    res.json({code: 'error', message: '系统错误！'})
                }
                else{
                    res.json({code: 'success', data:  {page, pageCount, students: data.map(m => {
                        m = m.toObject()
                        m.id = m._id.toString()
                        delete m._id
                        return m
                    })}   })
                }
            })
        }
    })
})


module.exports = route