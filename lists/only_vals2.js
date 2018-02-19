//~ basically trasforms A to B 
//~ where, A is the result of the view "allfields_RIasKey", B is the collection to give to backbone
//~ A:{"rows":[	{key:"RI_1", value:{"ri_name":"RI_1", "doctype":"ri"...}},
	//~ {key:"RI_1", value:{"ri_name":"RI_1", "doctype":"datacentre"...}},
	//~ {key:"RI_2", value:{"ri_name":"RI_2", "doctype":"ri"...}},
	//~ ...
//~ ]}
//~ 
//~ B:[	{key:"RI_1", country:"..", ..other main attr of ri_info, value:[{"ri_name":"RI_1", "doctype":"datacentre","volume_tby":"4"},{"ri_name":"RI_1","doctype":"ri"...},{...}]},
	//~ {key:"RI_2", country:"..", ..other main attr of ri_info,value:[{"ri_name":"RI_2", "doctype":"datacentre","volume_tby":"5"},{"ri_name":"RI_2","doctype":"ri"...},{...}]},
	//~ ...
	//~ ]


var validkeys=["ri_name","ri_type","country","wg","network_code","type","stations","kind","laboratory_research_field","equipment","brand","ri_institution","ri_manager", "_id"];




function isObject(obj) {
    return obj === Object(obj);
  }
  
  
function isArray (obj) {
    return toString.call(obj) == '[object Array]';
  }
  

function purgeRIJSONobj(RIJSONobj){
        var retObject= new Object();
        for(var key in validkeys){
            if (RIJSONobj[validkeys[key]]!=null){
                if(isArray (RIJSONobj[validkeys[key]])){
                    if(!isArray (retObject[validkeys[key]])){
                        retObject[validkeys[key]]= [];
                        }
                    for (var elemento in RIJSONobj[validkeys[key]]){
						if (!isObject (RIJSONobj[validkeys[key]][elemento])){
							retObject[validkeys[key]].push(RIJSONobj[validkeys[key]][elemento]);
							}
						else{
							retObject[validkeys[key]].push(purgeRIJSONobj(RIJSONobj[validkeys[key]][elemento]));
							}
                        }
                    }
                else if(isObject (RIJSONobj[validkeys[key]])){
                    //~ if val is an object must create new obj

                    retObject[validkeys[key]]= purgeRIJSONobj(RIJSONobj[validkeys[key]]);
                    }
                else{
                    // if val is a val just assign value
                    retObject[validkeys[key]]=RIJSONobj[validkeys[key]];
                    }
                }
            }
        return retObject;
     }
     
     
     
//~ ***********************************************

function(head, req) {
  start({
	"headers": {
	  "Content-Type": "application/json"
	 }
  });
	var objArr=new Array();  //B in the example
	var len=0;
	var found=false;
	while(row = getRow()){
		RIJSONobj=row.value;
		//~ return JSON.stringify(RIJSONobj['ri_name']);
		len=objArr.length;
            
            
		for (var i=0;i<len;i++){ //search if an object eith ri_name as key already exists
            
            // if RIJSONobj['ri_name'] is already in the array, fields are added
			if (objArr[i].key==RIJSONobj['ri_name']){
                if (RIJSONobj.doctype=="ri"){
                    var valore=objArr[i];
                    var riGeneral=purgeRIJSONobj(RIJSONobj);
                    for (var mykey in riGeneral){
                        objArr[i][mykey]=riGeneral[mykey];
                        }
                }
                else {
                    objArr[i].value.push(purgeRIJSONobj(RIJSONobj));
                    }
                    
                found=true;
				}
            
			}
			
		if (found==false){//if not, create new object and push it in the array
            if (RIJSONobj['doctype']=="ri"){
                var ogj=purgeRIJSONobj(RIJSONobj);
                ogj['key']=RIJSONobj['ri_name'];
                ogj['value']=[];
                objArr.push(new Object(ogj));
                }
			else{
                objArr.push(new Object({key:RIJSONobj['ri_name'],value:[purgeRIJSONobj(RIJSONobj)]}));
                }
                
			}
		found=false;
		}

  return ('{"rows":'+JSON.stringify(objArr)+'}');
  
  }