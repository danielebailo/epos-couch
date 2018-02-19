function(head, req) {
  start({
    "headers": {
      "Content-Type": "application/json"
     }
  });
  var rowArray = new Array();
  var count=0;
  
  // puts all doc values in a rowArray
  while(row = getRow()){
	  rowArray.push(row.value);
	  count=count+1;
	  }
  
	//retrieve fields names from ONE document an uses it to fill in 
	//the key of an asosciative array
	var associativeArray=new Object;
	//~ for (field in rowArray[0]){
		//~ associativeArray[field]=new Array();
		//~ }

	for (row in rowArray){
		//~ pagina= pagina+row 
		for(field in rowArray[row]){
			if (associativeArray[field]==null || associativeArray[field]==[]){
				associativeArray[field]=new Array();
				}
			 associativeArray[field].push(rowArray[row][field]);
			}
		}
	
	
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

	
	
	//remove duplicates from associative array
	for(field in associativeArray){
		var newArray=new Array(eliminateDuplicates(associativeArray[field]));
		//~ associativeArray[field]=[];
		associativeArray[field]=newArray;
		delete newArray;
		}
	
	
	//~ return "wdfyrk";
	
	//~ 
	return JSON.stringify(associativeArray);
	


}