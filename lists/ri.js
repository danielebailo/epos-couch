//~  ordinary call: _list/ri/allfields_RIaskey


function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "application/json"
     }
  });
    var myobj={};
    
    //this var actually mixes two fields : doctype and facility type... dirty but working
    var doctypeToAgregate=['ri'];
  
  
  // 1) create an object like this
  //~ {
	//~ AFAD - Turkey National Seismology Network: {
		//~ _id: "7fb1bbae76dcc914c19b04373d0dca7e",
		//~ _rev: "1-b9cb9a142ca7bd943a96381bb17465d1",
		//~ doctype: "facility",
		//~ ri_name: "AFAD - Turkey National Seismology Network",
		//~ kind: "National",
		//~ stations: [
			//~ {
			//~ Station_code: "EPOS",
			//~ gpsLon: 42.7279,
			//~ gpsLat: 41.5035,
			//~ gpsElev: 1499
			//~ }],
		//~ data_policy: "open",
		//~ other_details: ""
		//~ },
//~ 
	//~ ASCR - Local seismic array Provadia:{
		//~ _id: "7fb1bbae76dcc914c19b04373d0e9033",
		//~ _rev: "1-9cc3f1a773bf14c9adfc75005c1416e8",
		//~ ....
		//~ },
		//~ .....
//~ }
  
  while(row = getRow()) {
	  for (var docType in doctypeToAgregate){
		  if (row['value']['doctype']==doctypeToAgregate[docType] || row['value']['facility_type']==doctypeToAgregate[docType]){
			  if(myobj[row.key]==undefined){
				myobj[row.key]=row['value'];
				}
			  else {
				  for (var elem in row['value']){
					  myobj[row.key][elem]=row['value'][elem];
					  }
				  }
			  } 
		  }
	}


//~ 2 converts it in something more digerible and JSON like, like this
//~ {
	//~ total_rows: 636,
	//~ offset: 0,
	//~ rows: [
		//~ {
		//~ id: "74e5cff153fe93d863edab7879cfbec8",
		//~ key: " AUTH - University of Tessaloniki -"
		//~ }]
//~ }

	  //~ return "ciao"; 
	  
	  
	  var totalRows=0;
	  var outObj={rows:[]};
	  for (var element in myobj){
		  outObj['rows'].push({key:element, value:myobj[element]});
		  totalRows++;
		  }
	  outObj['total_rows']=totalRows;
	  outObj['offset']=0;
	  return JSON.stringify(outObj);
}