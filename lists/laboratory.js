//~  ordinary call: _list/laboratory/allfields_RIaskey


function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "application/json"
     }
  });
  
  
  //helper
  function MergeJSON (o, ob) {
	  var JSONout={}
      for (var z in ob) {
           JSONout[z] = ob[z];
      }
      for (var x in o) {
           JSONout[x] = o[x];
      }
      return JSONout;
	}
  
  
  ///////////// program begins
    //init vars
    var outObj={};
    var riObj={};
	var labList=[];
  
	
	//populate riList and labList
	while(row = getRow()) {
		if (row['value']['facility_type']=='laboratory' && row['value']['doctype']=='facility'){
			
			//if the quantity of an instrument is > 1 (let's say N ), then it writes it N times in the equipment list
			if (row['value']['equipment']!=[]){
				for (var instrument in row['value']['equipment']){
					if (row['value']['equipment'][instrument]['quantity']>1 && row['value']['equipment'][instrument]['quantity']!= undefined && row['value']['equipment'][instrument]['quantity'] !=''){
						var quantity=row['value']['equipment'][instrument]['quantity'];
						row['value']['equipment'][instrument]['quantity']=1;
						var instrument=row['value']['equipment'][instrument];
						for (var i=0; i<quantity;i++){
							row['value']['equipment'].push(instrument);
							}
						}
					}
				}

			labList.push({ri_name:row['key'], value:row['value']})
			}
		else if (row['value']['doctype']=='ri'){
			riObj[row['value']['ri_name']]=new Object (row['value']);
			}
		}
		
	//~ return JSON.stringify(labList);

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
	
		  
	  var totalRows=0;
	  var outObj={rows:[]};
	  
	  for (var lab in labList){
		  var outVal =new Object (MergeJSON(riObj[labList[lab]['ri_name']],labList[lab]['value']));
		  outVal['laboratory_name']=labList[lab]['ri_name'] +"-"+ labList[lab]['value']['laboratory_name']; //in case two labs in different RIs have same name
		  outObj['rows'].push({key:labList[lab]['ri_name'], value:outVal});
		  totalRows++;
		  }

	  outObj['total_rows']=totalRows;
	  outObj['offset']=0;
	  return JSON.stringify(outObj);
}