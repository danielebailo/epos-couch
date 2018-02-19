//~ this list is used with the "allfields_RIasKey" view.  A key must be specified in the view (example: _list/aggregate_items/allfields_RIaskey?="my wonderful RI")so that the records returned by the view are related only to the selected RI

//~ creates JSON object like this:
//~ {	RI:[list of ri's docs],
	//~ FACILITY:[list of facilityes docs],
	//~ DATACENTRE:[],
	//~ DATABASE:[]
    //~ }




function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "application/json"
     } 
  });
  //~ return "hi";
  var jsonInfo= new Object();
  //creates an array foreach possible object. i.e. ri, facility, datacentre, database
  //~ jsonInfo['ri']=new Array();
  //~ jsonInfo['facility']=new Array();
  //~ jsonInfo['datacentre']=new Array();
  //~ jsonInfo['database']=new Array();
  
  
  
  while (row = getRow()){
      
     //creates an array foreach possible object. i.e. ri, facility, datacentre, database.. and others 
    if (jsonInfo[row.value['doctype']]==undefined){
        
        jsonInfo[row.value['doctype']]= new Array();
        }
	jsonInfo[row.value['doctype']].push(row.value);
	}
    
    // RENDERS OUTPUT
    var pagina='{';
    for (key in jsonInfo){
        pagina=pagina+'"'+key+'":'+JSON.stringify(jsonInfo[key])+',';
        }
    pagina=pagina.slice(0,-1);
    return pagina+"}";
    

   
}