$(function() {
	$("#go").click(function() {
		var word=$("#word").val();
        
        if(word!=null&&word!=""){
        var url="http://fanyi.youdao.com/openapi.do?keyfrom=fgbnbb&key=1276642867&type=data&doctype=json&version=1.1&q="+word;
        $.ajax({
			type : "get",
			url : url,
			data : {
			},
			success : function(data) {//
                //data=jQuery.parseJSON(data);
				var xdata=data.translation[0];
				 $("#result").html(xdata);

            }
            });   
        }
	       });

});