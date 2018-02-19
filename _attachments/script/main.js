$(function(){
	$("#mylogindiv").couchLogin({
    loggedIn : function(userCtx) {
        alert("hello "+userCtx.name);
    }, 
    loggedOut : function() {
        alert("bye bye");
    }
	});
  
  
  
  
  }
