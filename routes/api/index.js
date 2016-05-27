const   express = require('express'),
        Student = require('../../mongoose')
  
  
function getPages(page, pageCount){
    var pages = [page]
    
    //--------
    
    // 左边的第1个页码
    var left = page - 1
    // 右边的第1个页码
    var right = page + 1
    
    // 左边最多允许显示多少个
    // 如果右侧有充足的页码可以显示，左侧最多5个
    // 如果右侧页码不够5个，左侧可以多显示
    // var leftMaxCount = pageCount - page >= 5 ? 5 : 11 - (1 + pageCount - page)
    
    // while (left >= 1 && leftMaxCount-- > 0) {
    //     pages.unshift(left--)
    // }
    
    // while (right <= pageCount && pages.length < 11){
    //     pages.push(right++)
    // }
    
    
    // 左右两边各加1个页码，直到页码够11个或
    // 左边到1、右边到总页数
    while(pages.length < 11 && (left >= 1 || right <= pageCount)){
        if(left > 0) pages.unshift(left--)
        if(right <= pageCount) pages.push(right++)
    }
    
    return pages
}
        
const route = express.Router()

route.post('/(:page)?', (req, res) => {
    
    // console.log(getPages(12, 72))
    // console.log(getPages(3, 72))
    // console.log(getPages(70, 72))
    
    var page = req.params.page
    page = page || 1
    
    page = parseInt(page)
    if(page < 1) page = 1
    
    var pageSize = 5

    Student.find().count((err, total) => {
        // console.log(total)
        
        if(err){
            res.json({code: 'error', message: '系统错误！'})
        }
        else{
            var pageCount = Math.ceil(total / pageSize)
            
            if(page > pageCount) page = pageCount
            
            Student.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .select('name isMale age phone email')
            .exec((err, data) => {
                if(err){
                    res.json({code: 'error', message: '系统错误！'})
                }
                else{
                    res.json({code: 'success', data:  {
                            page, 
                            pageCount, 
                            pages:getPages(page, pageCount), 
                            students: data.map(m => {
                                m = m.toObject()
                                m.id = m._id.toString()
                                delete m._id
                                return m
                            })
                        }   
                    })
                }
            })
        }
    })
})


module.exports = route