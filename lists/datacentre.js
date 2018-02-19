//~  ordinary call: _list/[facility_type]/allfields_RIaskey

//~ ******* MERGE RI AND FACILITY FIELD *******
//~ this funciton gives as aoutput a json object  which is:
//~ a list of json object. Each object has the ri_name as key, and as a content the fields of the facility and additional ri fields

function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "application/json"
     }
  });

  
  var riObj={};
  var facilityObj={};
  var myobj=[];
    
  var facilityTypeToAgregate='datacentre';
  
  //~ 1. create two obj: 1. ri obj contains the list of the ris; keys are ri_names and values the other ri fields, 2. the facility ob (e.g. seismic nets). Same as ri obj, but keys are the _ids of facilities
  
  while(row = getRow()) {
	  if (row['value']['doctype']=='ri'){
		  riObj[row.key]=row.value;
		  }
	  else if (row['value']['doctype']==facilityTypeToAgregate){
		  facilityObj[row.id]=row.value;
		  }
	}

	//~ 2. now it joins them
	
	for (var facility in facilityObj){
		var tempObj= new Object();
		tempObj['key']=facilityObj[facility]['ri_name'];
		tempObj['value']=facilityObj[facility];
		
		//~ tempObj['value']['sss']=riObj[facilityObj[facility]['ri_name']];
		for (var elem in riObj[facilityObj[facility]['ri_name']]){
		  tempObj['value'][elem]=riObj[facilityObj[facility]['ri_name']][elem];
		  }
		
		myobj.push(tempObj);
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
		  //~ outObj['rows'].push({key:element, value:myobj[element]});
		  outObj['rows'].push(myobj[element]);
		  totalRows++;
		  }
	  outObj['total_rows']=totalRows;
	  outObj['offset']=0;
	  return JSON.stringify(outObj);
}









//~ function(head, req) {
  //~ var row;
  //~ start({
    //~ "headers": {
      //~ "Content-Type": "application/json"
     //~ }
  //~ });
    //~ var myobj={};
    //~ 
    //~ //this var actually mixes two fields : doctype and facility type... dirty but working
    //~ var doctypeToAgregate=['ri', 'datacentre'];
  //~ 
  //~ 
  //~ // 1) create an object like this
  //~ 
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
  //~ 
  //~ while(row = getRow()) {
	  //~ for (var docType in doctypeToAgregate){
		  //~ if (row['value']['doctype']==doctypeToAgregate[docType] || row['value']['facility_type']==doctypeToAgregate[docType]){
			  //~ if(myobj[row.key]==undefined){
				//~ myobj[row.key]=row['value'];
				//~ }
			  //~ else {
				  //~ for (var elem in row['value']){
					  //~ myobj[row.key][elem]=row['value'][elem];
					  //~ }
				  //~ }
			  //~ } 
		  //~ }
	//~ }
//~ 
//~ 
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
//~ 
	  //~ return "ciao"; 
	  //~ 
	  //~ 
	  //~ var totalRows=0;
	  //~ var outObj={rows:[]};
	  //~ for (var element in myobj){
		  //~ outObj['rows'].push({key:element, value:myobj[element]});
		  //~ totalRows++;
		  //~ }
	  //~ outObj['total_rows']=totalRows;
	  //~ outObj['offset']=0;
	  //~ return JSON.stringify(outObj);
//~ }