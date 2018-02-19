//~ basically trasforms A to B 
//~ where, A is the result of the view "allfields_RIasKey", B is the collection to give to backbone
//~ A:{"rows":[	{key:"RI_1", value:{"ri_name":"RI_1", "doctype":"ri"...}},
	//~ {key:"RI_1", value:{"ri_name":"RI_1", "doctype":"datacentre"...}},
	//~ {key:"RI_2", value:{"ri_name":"RI_2", "doctype":"ri"...}},
	//~ ...
//~ ]}
//~ 
//~ B:[	{key:"RI_1", value:{"ri_name":"RI_1", "volume_tby":"4"...all merged fields of RI_1}},
	//~ {key:"RI_2", value:{"ri_name":"RI_2", "volume_tby":"4"...all merged fields of RI_2}},
	//~ ...
	//~ ]


function(head, req) {
  start({
	"headers": {
	  "Content-Type": "application/json"
	 }
  });
	var objArr=new Array();
	var output='{"rows":[';
	var len=0;
	var found=false;
	while(row = getRow()){
		RIJSONobj=row.value;
		//~ return JSON.stringify(RIJSONobj['ri_name']);
		len=objArr.length;
		
		for (var i=0;i<len;i++){// if RIJSONobj['ri_name'] is already in the array, fields are added
			if (objArr[i].key==RIJSONobj['ri_name']){
				for (var field in RIJSONobj){
					objArr[i].value[field]=RIJSONobj[field];
					}
				found=true;
				}
			}
			
		if (found==false){//if not, create new object and push it in the array
			objArr.push(new Object({key:RIJSONobj['ri_name'],value:RIJSONobj}));
			}
		found=false;
		}

  return ('{"rows":'+JSON.stringify(objArr)+'}');
  
  }