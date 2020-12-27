//下订单
$("#submit_buy").click(function(){
        var random4 = parseInt(Math.random()*(9999-1111+1)+1111,10);
		var tdate = new Date().Format("yyyyMMddHHmmss");
		var trade_no = String(tdate)+String(random4);
		var tid = $("#tid").val();
        //var type = $("#type").val();	 		
        var price = $("#price").val();		
		var contact = $("#contact").val();		
		if(contact==''){layer.alert('请填写qq或邮箱手机等联系方式用于订单查询！');return false;}		
		$('#submit_buy').val('Loading');
		var payment='alipay';
		$.ajax({
			type : "POST",
			url : "/ajax.php?act=create",
			data : {tid:tid,contact:contact,trade_no:trade_no},
			dataType : 'json',
			success : function(data) {
				if(data.code == 0){
					//layer.alert(data.msg);					
					layer.open({
						content: ''+data.msg+'',
						btn: ['立即付款', '取消订单'],
						yes: function(index, layero){
						//立即付款
						checkout(payment,trade_no);
					  },
					  btn2: function(index, layero){
						//取消订单
						cancelTrade(trade_no)
					  },
					  cancel: function(){ 
						//右上角关闭回调
						cancelTrade(trade_no)
					  }
					});
				}else{
					layer.alert(data.msg);
				}
				
			} 
		});
});

function checkout(payment,trade_no){	
	$.ajax({		
		type:"POST",
		url:"/pay/index.php",
		data : {payment:payment,trade_no:trade_no},
		dataType : 'json',
		success : function(data){						
			if(data.code == 0){
					window.location.href = data.msg;
				}else{
					layer.alert(data.msg);
				}
		}
	});
}
function cancelTrade(trade_no){
	$.ajax({
		type:"POST",
		url:"/ajax.php?act=cancelTrade",
		data : {trade_no:trade_no},
		dataType : 'json',
		success : function(data){}
	});
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//complaint
