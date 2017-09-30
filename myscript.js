main();
var txt = null;
var lasttxt = null;
var audiourl = null;
var myAudio = new Audio();

//创建document的嵌入页面。。没问题
function creatediv() {
    var div = document.createElement("div");
    div.id = "fgbnbb";
    //div.className = "mydiv";

    var text = document.createElement("div");
    text.id = "text";
    //text.className = "text";

    div.appendChild(text);

    var audio = document.createElement("div");
    audio.id = "audio";
    //audio.className = "audio";

    var button = document.createElement("button");
    //button.type="button";
    button.id = "mybutton";
    //button.className = "mybutton";
    audio.appendChild(button);

    div.appendChild(audio);
    return div;
}

function main() {
    var mydiv = creatediv();
    mydiv.style.display = "none";
    document.body.appendChild(mydiv);
    $(document).ready(function () {
        //这里是button响应的地方*/
        $("#mybutton").click(function () {
            myAudio.src = audiourl;
            myAudio.play();
        });
    });

    document.onmouseup = function (e) {
        e = e || window.event;

        txt = funGetSelectTxt();
        var sh = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var left = (e.clientX - 40 < 0) ? e.clientX + 20 : e.clientX - 40,
            top = (e.clientY - 40 < 0) ? e.clientY + sh + 20 : e.clientY + sh - 40;
        var top = (e.clientY - 40 < 0) ? e.clientY + sh + 20 : e.clientY + sh - 50;

        if (check(txt) && txt != lasttxt) {
            lasttxt = txt;
            mydiv.style.left = left + "px";
            mydiv.style.top = top + "px";
            settext("<p>正在翻译，请稍等。。。</p>");
            //document.body.appendChild(mydiv);
            mydiv.style.display = "block";
            var queryurl = "https://fanyi.youdao.com/openapi.do?keyfrom=fgbnbb&key=1276642867&type=data&doctype=json&version=1.1&q=" + txt;
            $.ajax({
                type: "get",
                url: queryurl,
                data: {},
                success: function (data) {
                    showData(data, mydiv);
                }
            });

        }
    };
    document.onmousedown = function (e) {
        txt = "";

        //需要修改元素失去焦点
        var mydivm = document.getElementById("fgbnbb");
        if (mydivm.style.display == "block") {
            //document.body.removeChild(mydivm);
            //mydivm.style.display = "none";
            if (!isinclude(e, mydivm)) {
                mydivm.style.display = "none";
                lasttxt = "";
            };
        }
    }
    document.onkeydown = function (e) {
        var keycode = e.which;
        //var realkey = String.fromCharCode(e.which);
        //alert("按键码:"+keycode +" 字符: " + realkey);

        if (keycode == 27) {
            var mydivm = document.getElementById("fgbnbb");
            if (mydivm.style.display == "block") {
                mydivm.style.display = "none";
                lasttxt = "";
            }
        }
    }
}

function isinclude(e, div) {
    e = e || Window.Event;
    var x = e.clientX;
    var y = e.clientY;
    var top = div.offsetTop;
    var left = div.offsetLeft;
    var height = div.clientHeight;
    var width = div.clientWidth;
    var sh = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (x >= left && x <= (left + width) && (y + sh) >= (top) && (y + sh) <= (top + height)) {
        return true;
    } else {
        return false;
    }

}

//只是匹配了是否为英文，可以写成按大小写分开
function check(string) {
    var re = new RegExp("^[A-Za-z ;,.?？！!，；。']+$");
    if (re.test(string)) {
        return true;
    } else {
        return false;
    }
}

var funGetSelectTxt = function () {
    var txt = "";
    if (document.selection) {
        txt = document.selection.createRange().text; // IE
    } else {
        txt = document.getSelection();
    }
    return txt.toString();
};

function showData(data, mydiv) {
    settext("");
    switch (data.errorCode) {
        case 0:
            audiourl = "https://dict.youdao.com/dictvoice?audio=" + txt;
            //alert(audiourl);
            settext("<p>" + data.query + "    释意：" + data.translation + "</p>");
            if (data.basic != null) {
                $.each(data.basic.explains, function (i, item) {
                    appendtext("<p>     " + item + "</p>");
                });
            }


            top = (top - mydiv.clientHeight * 0.8) < 0 ? (top + mydiv.clientHeight * 0.3) : (top - mydiv.clientHeight * 0.8);
            var width = mydiv.clientHeight > 200 ? "300px" : "250px";
            mydiv.style.top = top + "px";
            mydiv.style.width = width;
            //document.body.appendChild(mydiv);
            mydiv.style.display = "block";
            break;
        case 20:
            settext("太长了啦，不要进来，不要啊，啊.....不要啊，流氓，滚啊，啊...宝宝..宝宝不行了...");
            break;
        case 30:
            settext("听说...听说....哎呀，人家又不是啥都能做，这个宝宝做不了啊.55555");
            break;
            /* 40 - 不支持的语言类型　 
            50 - 无效的key　 
            60 - 无词典结果， 仅在获取词典结果生效*/
        case 40:
            settext("你都说什么火星文，滚回你的火星去，哼...");
            break;
        case 50:
            settext("少年，你的key出错了。怎么就失效了呢，唉，人生有时候真的是伤心啊");
            break;
        case 60:
            settext("宝宝...宝宝...宝宝什么都没找到....55555");
            break;
        default:
            settext("出错了，宝宝还是个孩子。。。求原谅啊::>_<:: ");
            break;
    }

}

function settext(str) {
    var text = document.getElementById("text");
    text.innerHTML = str;
}

function appendtext(str) {
    var text = document.getElementById("text");
    text.innerHTML += str;
}
