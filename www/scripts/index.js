
function removeStudent(id, name) {
    // 更新模态框内容区
    $('#removeModal .modal-body').text('点击确定将删除' + name)
    
    // 弹出id是removeModal的模态框
    $('#removeModal').modal()
    
    // 多次点击删除图标执行下面代码会导致
    // 在确定按扭上添加越来越多的事件处理函数
    // $('#removeModal .btn-danger').click(function(){
    //     alert(id)
    // })
    
    
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
    
    
    // $('#removeModal .btn-danger')
    // .unbind('click')
    // .bind('click', function(){
    //     alert(id)
    // })
    
    
    // if(confirm('确定要删除吗？')){
    //     $.post(
    //         '/api/student/remove/' + id,
    //         null,
    //         function(res){
    //             if(res.code == 'success'){
    //                 location.reload()
    //             }
    //             else{
    //                 alert(res.message)
    //             }
    //         }
    //     )
    // }
}