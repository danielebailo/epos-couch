//~ this list funciton is usually used with 'facets' view


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

function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
                ++count;
    }

    return count;
}

// X-Browser isArray(), including Safari
function isArray(obj) {
    if( Object.prototype.toString.call( obj ) === '[object Array]' ) {
    return true;
		}
	else return false;
}


function(head, req) {
  start({
    "headers": {
      "Content-Type": "application/json"
     }
  });
   
//~ the 'facets' view emit this: 
//~ emit(doc.ri_name, [doc.ri_name, doc.doctype, doc.ri_type, doc.country,doc.wg,  doc.facility_type, doc.network_code, doc.laboratory_research_field, doc.equipment]);

//the tuype field is the tupe of equipment in lab docs
    var rowArray = new Array();
    var count=0;
    
    //~ ************* modify facets*****************
    //~ NB ADD THE FACETS ALSO TO THE ONLY_VALS2 LIST  FUNCTION
    //~ NB this func works only because objects are treated like arrays...
    
	var returnObj={ri_name: [[]],ri_type: [[]],country: [[]], wg: [[]],ri_manager:[[]], network_code: [[]],laboratory_research_field: [[]],type: [[]],brand:[[]]};
    
    while(row = getRow()){
		var i=0;
		for (var myelement in returnObj){//iterate over every field of returnObj
			if (isArray(row.value[i])){//is this  doc.equipment or doc.wg
				for (var arEl in row.value[i]){
					if (myelement=='type'){
						if (row.value[i][arEl]['type']!='' && row.value[i][arEl]['type']!=undefined && row.value[i][arEl]['type']!="undefined"){
							returnObj['type'][0].push(row.value[i][arEl]['type']);
							returnObj['brand'][0].push(row.value[i][arEl]['brand']);
							}
						}
					else {
						if (row.value[i][arEl]!='' && row.value[i][arEl]!=undefined && row.value[i][arEl]!="undefined")
						returnObj[myelement][0].push(row.value[i][arEl]);
						}
					
					}
				}
			else {
				if (row.value[i]!='' && row.value[i]!=undefined){
				returnObj[myelement][0].push(row.value[i]);
					}
				}
			i=i+1;
			}
	  }
   
	// remove duplicates
	for (var element in returnObj ){
		returnObj[element][0]=eliminateDuplicates(returnObj[element][0]);
		}

    return JSON.stringify(returnObj);

    }