
function removeStudent(id, name) {
    $('#removeModal .modal-body').text('点击确定将删除' + name)
    $('#removeModal').modal()
    
    $('#removeModal .btn-danger')
    .off('click')                   //移除所有点击事件监听函数
    .on('click', function(){        //添加一个点击事件监听函数
        $.post(
            '/api/student/remove/' + id,
            null,
            function(res){
                if(res.code == 'success'){
                    location.reload()
                }
                else{
                    alert(res.message)
                }
            }
        )
    })
}


function showPage(page, pageCount){
    if(page < 1) page = 1
    if(page > pageCount) page = pageCount
    
    $.post(
        '/api/index/' + page,
        null,
        function(res){
            if(res.code == 'success'){
                var html = template('table-template', res.data)
                $('.data').html(html)
            }
            else{
                alert(res.message)
            }
        }
    )
}

showPage(1,1)