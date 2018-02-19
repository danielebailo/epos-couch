//~ THE FUNCTION IS DISABLED BECAUSE IT'S VERY RESOURCE CONSUMING. TO RE-ACTIVATE IT JUST COMMENT THE "return null" LINE

function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "application/json"
     }
  });
  
  //~ ************* REMOVE THIS *******************
  return null;
	//declare function to remove duplicates in the same array
	function eliminateDuplicates(arr) {
	  var i,
		  len=arr.length,
		  out=[],
		  obj={};

	  for (i=0;i<len;i++) {
		obj[arr[i]]=0;
	  }
	  for (i in obj) {
		out.push(i);
	  }
	  return out;
	}

  //~ var pagina='{ "docs":[\n';
  //~ var counter=0;
  var couchid=""
  var list= [];
  var uniques=[];
  var dups=[];
  var dupsRi=[];
  while(row = getRow()) {
	 couchid= row.value._id;
	
	delete row.value._id;
	delete row.value._rev;
	list.push([JSON.stringify(row.value),couchid]);
  }
  
  //~ return "ok4";
  //~ list.forEach(function(value)
   for (elem in list) {
	if (uniques.indexOf(list[elem][0]) == -1) {
		uniques.push(list[elem][0]);
		}
	else{
		dups.push(list[elem]);
		}
	}
	
	for (elem in dups){
		dupsRi.push( dups[elem][1]);
		  dups[elem]=dups[elem][0];
		}
		
	//~ return JSON.stringify(dupsRi_name);
	
	
	return ('{"dups":\n['+(dups)+'],\n "uniques":\n['+(uniques)+'],\n"duplicate RIs":\n'+JSON.stringify(dupsRi)+'\n}');
  //~ pagina=pagina.slice(0,-2);
  //~ pagina=pagina+']}';
  
  //~ return pagina;
}