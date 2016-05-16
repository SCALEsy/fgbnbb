
test();


function test() {
	document.onmouseup = function(e) {
		e = e || window.event;
        
		var txt = funGetSelectTxt();
        var sh = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		var left = (e.clientX - 40 < 0) ? e.clientX + 20 : e.clientX - 40, top = (e.clientY - 40 < 0) ? e.clientY + sh + 20 : e.clientY + sh - 40;
        var top = (e.clientY - 40 < 0) ? e.clientY + sh + 20 : e.clientY + sh - 50;
		var mydiv=creatediv();
        if (check(txt)) {
			mydiv.style.left = left + "px";
			mydiv.style.top = top + "px";
            mydiv.innerHTML="<p>正在翻译，请稍等。。。</p>";
            document.body.appendChild(mydiv); 
            
            var url="https://fanyi.youdao.com/openapi.do?keyfrom=fgbnbb&key=1276642867&type=data&doctype=json&version=1.1&q="+txt;
            $.ajax({
			type : "get",
			url : url,
			data : {
			},
			success : function(data) {
                mydiv.innerHTML="";
                switch(data.errorCode){
                    case 0:
                        mydiv.innerHTML+="<p>"+data.query+"    释意："+data.translation+"</p>";
                        $.each(data.basic.explains,function(i,item){
                            mydiv.innerHTML+="<p>     "+item+"</p>"; 
                        });
                        
                        top=(top-mydiv.clientHeight*0.8)<0?(top+mydiv.clientHeight*0.3):(top-mydiv.clientHeight*0.8);
                        var width=mydiv.clientHeight>200?"300px":"250px";
                        mydiv.style.top=top+"px";
                        mydiv.style.width=width;
                        break;
                    default:
                        $("#fgbnbb").append("出错了，宝宝还是个孩子。。。求原谅啊::>_<:: ");break;
                }
            }
            });
            
		} else {
            var mydiv=document.getElementById("fgbnbb");
            if(mydiv!=null){
                document.body.removeChild(mydiv);
            }
            
		}
	};
	
}

function creatediv(){
    var div=document.createElement("div");
    div.id="fgbnbb";
    div.className="mydiv";
    return div;
}

//只是匹配了是否为英文，可以写成按大小写分开
function check(string)
{
    var re =new RegExp("^[A-Za-z ]+$");
       if(re.test(string)){
            return true;
        }else{
        return false;
    }
}

var funGetSelectTxt = function() {
		var txt = "";
		if(document.selection) {
			txt = document.selection.createRange().text;	// IE
		} else {
			txt = document.getSelection();
		}
		return txt.toString();
};