const   express = require('express'),
        Student = require('../../mongoose')
        
const route = express.Router()


route.post('/add', (req, res) => {
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


route.post('/edit/:id', (req, res) => {
    req.body.ip = req.ip
    req.body.updateTime = new Date()
    
    console.log(req.body)
    
    Student.findByIdAndUpdate(req.params.id, req.body, err => {
        if(err){
            res.json({code: 'error', message: '系统错误'})
        }
        else{
            res.json({code: 'success', message: '成功！'})
        }
    })
})


route.post('/remove/:id', (req, res) => {
    Student.findByIdAndRemove(req.params.id, err => {
        if(err){
            res.json({code: 'error', message: '系统错误'})
        }
        else{
            res.json({code: 'success', message: '成功！'})
        }
    })
})


module.exports = route