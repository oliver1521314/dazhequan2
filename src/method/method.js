var method = {};
method.addevent = function(element,type,handler){
  if(element.addEventListener){
    element.addEventListener(type,handler,false);
  }else if(element.attachEvent){
      element.attachEvent('on'+type,handler);
    }else {
       element['on'+type]=handler;
    }
};
method.removeevent = function(element,type,handler){
  if(element.removeEventListener){
    element.removeEventListener(type,handler,false);
  }else if(element.detachEvent){
      element.detachEvent('on'+type,handler);
    }else {
       element['on'+type]=null;
    }
};
method.ajax = function(data,url,methods,handler){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState===4){
      if(xhr.status>=200 && xhr.status < 300||xhr.status === 304){
        handler(xhr.responseText);
      }
      else {
        alert("ajax通信失败 "+xhr.status);
      }
    }
  };
  xhr.onerror = function(){
    console.log("error");
  }
  xhr.open(methods,url,true);
  if(methods === 'post'){
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data);
  }else if(methods === 'get'){
    xhr.send();
  }
}
method.testlogin = function(){
  if(localStorage.sign_in==='true' && localStorage.username){
    return true;
  }else {
    return false;
  }
}
method.throttling1 = function(func,delay){
  var inthrott = false;
  return function(){
    var self = this;
    var args = arguments;
    if(!inthrott){
      func.apply(self,args);
      inthrott = true;
      setTimeout(function(){
        inthrott = false;
      },delay);
    }
  }
}
method.throttling2 = function(func,delay){
  var inthrott = false;
  var timer;
  return function(){
    var self = this;
    var args = arguments;
    var last = false;
    if(!inthrott){
      func.apply(self,args);
      inthrott = true;
      setTimeout(function(){
        inthrott = false;
      },delay);
    }else {
      clearTimeout(timer);
      timer = setTimeout(function(){
        func.apply(self,args);
        inthrott = false;
      },500);
    }
  }
}
method.debounce = function(func,delay){
  var timer;
  return function(){
    var args = arguments;
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function(){
      func.apply(this,args);
    },delay);
  }
}
method.fadeIn = function($el,t){
    var o = 1;
    var step = 1/(t/50);
    if(!$el.style.opacity){
      $el.style.opacity = 1;
    }
    var timer = setInterval(function($el,step){
      if($el.style.opacity<0){
        clearInterval(timer);
      }else {
        $el.style.opacity -= step;
      }
    }.bind(null,$el,step),50);
  }

method.htmlEncode = function(str){
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
}
method.htmlDecode = function(str) {
      var div = document.createElement("div");
      div.innerHTML = str;
      return div.innerHTML;
}
method.html_encode = function(str)
{
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&/g, "&gt;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/\'/g, "&#39;");
  s = s.replace(/\"/g, "&quot;");
  s = s.replace(/\n/g, "<br>");
  return s;
}

method.html_decode = function(str)
{
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&gt;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/&#39;/g, "\'");
  s = s.replace(/&quot;/g, "\"");
  s = s.replace(/<br>/g, "\n");
  return s;
}
method.upload = function(button,result,input){

  //上传文件,适合小于20M的文件上传
  button.on('click', function () {

      $('#js-file').off('change').on('change', function (e) {
          var file = e.target.files[0];
          cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, myFolder + file.name, file, 1);//insertOnly==0 表示允许覆盖文件 1表示不允许
          $('#form')[0].reset();
          return false;
      });

      setTimeout(function () {
          $('#js-file').click();
      }, 0);

      return false;
  });
}
export default method;
