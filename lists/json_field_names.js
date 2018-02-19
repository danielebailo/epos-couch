//~ used with field_names view, which has as aoutput a json like this:(look value field)
//~ {"id":"9c19586300bda1b004bf5b00a0038464",
//~"key":{"_id":"9c19586300bda1b004bf5b00a0038464","_rev":"5-11719db28af2ab05eb2b913ae4ca44c7","ri_name":"Italian mobile seismic network","type":"seismic station","kind":"temporary","quantity":"","equipment":[{"type":"broadband","brand":"","specifics":"","quantity":20},{"type":"shortperiod","brand":"","specifics":"","quantity":8},{"type":"accelerometer","brand":"","specifics":"","quantity":60}],"purchase_value":"","year_of_acquisition":"","location":"","coverage":["local","mobile"],"site_of_study":"","specifics":"","other_details":"","data_type":["timeseries 100sps"],"data_format":["miniSEED"],"data_transmission":"","data_policy":"","doctype":"facility","status":""},
//~"value":["_id","_rev","ri_name","type","kind","quantity","equipment","purchase_value","year_of_acquisition","location","coverage","site_of_study","specifics","other_details","data_type","data_format","data_transmission","data_policy","doctype","status"]},

//THIS LIST FUNC.  TAKES THE VALUE FIELD OF DIFFERENT DOCTYPES (I.E. DIFFERENT FIELDS) AND INSERT IT INTO A LIST


function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "application/json"
     }
  });
  
  	//declare function to remove duplicates, used later
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
  
  
  
  var pagina='';
  //strategia: legge solo le righe dei doctype non letti
  //~ var doctypeFound=new Object();
  var facetsList=new Array();
  while(row = getRow()){
	  //~ if (doctypeFound[row.key['doctype']]!=true){//if this doctype hasn't been analysed, then put the list elms in value fields into the facetsList array
		for(var els in row.value){
			facetsList.push(row.value[els]);
			}
		//~ doctypeFound[row.key['doctype']]=true;
		}
	//~ }
	//~ return JSON.stringify(doctypeFound);
	return JSON.stringify(eliminateDuplicates(facetsList));
}