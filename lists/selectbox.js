//~ USED VITH THE seismic_net_and_gnss VIEW
//~ input: [{key:K1, value:V1}, {key:K2, value:V2}, {key:K3, value:V3}, {key:K4, value:V4}]
//~ OUTPUT: ['k1 - v1 ','k2,v2',...]




function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "application/json"
     } 
  });

  var outArray=[];
  
  
  while (row = getRow()){
	  var pushstring=""+row.key + ' - ' + row.value;
	outArray.push(pushstring);
	}
    

    return JSON.stringify(outArray);

}