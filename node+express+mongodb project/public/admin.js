$(function(){
	$('.del').click(function(e){
		var del = e.target;
		var id = $(del).data('id')
		var tr = $('.item-id-'+id)
		$.ajax({
			type:'DELETE',
			url:'/admin/list?id='+id
		}).done(function(result){
			if(result.success === 1){
				// console.log("success===1")
				if(tr.length>0){
					// console.log("tr成功删除")
					tr.remove();
				}
				}
			})
		})
	})