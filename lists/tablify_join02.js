//~ takes as input a key/value list like this
//~ 
//~ key:null,
//~ value: [list of items]
//~ 
//~ and gives as output a table where each line contains the list of items

function(head, req) {
  start({
    "headers": {
      "Content-Type": "text/html"
     }
  });
  var rowArray = new Array();
  var count=0;
  
  
    var headHTML="<script type=\"text/javascript\" src=\"script/test/vendor/json2.js\"></script>\
    <script type=\"text/javascript\" src=\"script/jquery-1.7.2-min.js\"></script>\
<script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\"></script>";
  headHTML=headHTML+"<html><header></header><body><form action=\"http://epos.bo.ingv.it/assets/documents/ride/SaveToExcel.php\" method=\"post\" target=\"_blank\" onsubmit='$(\"#datatodisplay\").val( $(\"&lt;div&gt;\").append( $(\"#ReportTable\").eq(0).clone() ).html() );console.log($(\"#datatodisplay\"));\'> <input  type=\"image\" src=\"/epos-couch/_design/epos-couch/img/xcel.png\"  > <input type=\"hidden\" id=\"datatodisplay\" name=\"datatodisplay\" /></form>";
  
  
  
//~ the view to be used with this list gives as output
//~ [doc.ri_name, null]   ---> RI GENERAL INFO
//~ [doc.ri_name, 1]      ---> FAILITY (network, lab etc)
//~ [doc.ri_name, 1]
//~ [doc.ri_name, 1]
//~ [doc.ri_name, null]
//~ [doc.ri_name, 1]
//~ [doc.ri_name, 1]

//~ what I have to do is to join the first null with the following "1"s



  // tempObj is an associative array where I put all the infos to be joined to each single line in output. Joining key is the RI_name
  // i decide that keys as [doc.ri_name, null] represent the part to be joined

	var tableObj={};
	var linenumber=0; //to be increased each time something is written in th object
	var joinPart;
	var justFoundRIgeneralInfo=false;
	var riName="";
	
	//~ 1. CREATE  A JSON OBJECT WHOSE PROPERTIES ARE the COLUMNs. Each value of a property is a list. Each element of a list is the cell value. Empty cells are marked as 'null'
	while(row = getRow()){ 
		count=count+1;
		if (row.key[1]==null){//general info
			  if(justFoundRIgeneralInfo==true){//the previous line was a general info (joinPart) and not a facility: print it (the last line) as a single line
				for (var mykeyvaluePair in joinPart){//iterates over each column/property/field of the joinPart object
					for(var oneElment in joinPart[mykeyvaluePair]){//TRICK it's a json obj with only 1 element
						if (!tableObj.hasOwnProperty(oneElment)){
							tableObj[oneElment]=new Array(head.total_rows);
							}
						tableObj[oneElment].splice(linenumber,0,joinPart[mykeyvaluePair][oneElment]);
						}
					}
					linenumber=linenumber+1;
				  }
				  
				
				joinPart=row.value;
				justFoundRIgeneralInfo=true;
				riName=row.key[0];
				
				if (count==(head.total_rows)){//if this is the last line just write it
					for (var mykeyvaluePair in joinPart){//iterates over each column/property/field of the joinPart object
					for(var oneElment in joinPart[mykeyvaluePair]){//TRICK it's a json obj with only 1 element
						if (!tableObj.hasOwnProperty(oneElment)){
							tableObj[oneElment]=new Array(head.total_rows);
							}
						tableObj[oneElment].splice(linenumber,0,joinPart[mykeyvaluePair][oneElment]);
						}
					}
					linenumber=linenumber+1;
					}
			}
		else{//facility
			if (row.key[0]==riName){//make an SQLjoin-like only if this facility belongs to the previous ri in the list
				
				for (var mykeyvaluePair in joinPart){//iterates over each column/property/field of the joinPart object
					for(var oneElment in joinPart[mykeyvaluePair]){//TRICK it's a json obj with only 1 element
					
						if (!tableObj.hasOwnProperty(oneElment)){
							tableObj[oneElment]=new Array(head.total_rows);
							}
						tableObj[oneElment].splice(linenumber,0,joinPart[mykeyvaluePair][oneElment]);
						}
					}
					
				for (var mykeyvaluePair in row.value){//iterates over each column/property/field of the row.value object
					for(var oneElment in row.value[mykeyvaluePair]){//TRICK it's a json obj with only 1 element
						if (!tableObj.hasOwnProperty(oneElment)){
							tableObj[oneElment]=new Array(head.total_rows);
							}
						tableObj[oneElment].splice(linenumber,0,row.value[mykeyvaluePair][oneElment]);
						}
					}
				justFoundRIgeneralInfo=false;
				}
			linenumber=linenumber+1;
			}
		}

    //~ return JSON.stringify(tableObj);
    
    
    //~ 2. CLEAN THE TABLE OBJECT: ERASE ADDITIONAL LINES WHICH WERE NOT USED 
    for (var mykeyvaluePair in tableObj){
		tableObj[mykeyvaluePair].length=linenumber;
		//~ return  JSON.stringify(tableObj[mykeyvaluePair]);
		}
    
    //~ 3. RENDERS THE TABLE 
    var header="<th scope =\"col\" ><b>#</b></th>";
	//HEADER
    for(var elem in tableObj){
		header=header+'<th scope ="col" id="'+elem+'"><b>'+elem+'</b></th>';
	}
	
	//TABLE
	var table="<table id=\"ReportTable\" border=1>";// " <table id=\"ReportTable\" border=1>";
	table=table+"<tr>"+header+"</tr>"
	
	for(var line=0;line<linenumber;line++){
		table=table+"<tr><td>"+line+"</td>";
		for (var field in tableObj){
			table=table+"<td>"+tableObj[field][line]+"</td>";
			}
		table=table+"</tr>";
	}
	table=table+"</table></body></html>";
	table=table.replace(/undefined/g, "n/a")
	
	return "<html><body><head>"+headHTML+"</head>"+table;
		//~ var i=0;
		//~ for(field in tableObj[elem]){
			//~ if(header[i]==undefined){
				//~ header[i]=Object.keys(rowArray[row][field])[0];
				//~ }
				//~ i=i+1;
			//~ }
		//~ 
        //~ pagina=pagina+'<tr><td><b>'+row+'</b></td>';
        //~ for(field in rowArray[row]){
            //~ pagina=pagina+'<td id="'+rowArray[row][field][Object.keys(rowArray[row][field])[0]]+'">'+rowArray[row][field][Object.keys(rowArray[row][field])[0]]+'</td>\n';
            //~ }
        //~ pagina=pagina+'</tr>';
        //~ }
        //~ //attach table heder
        //~ 
        //~ var tempHead="<table id=\"ReportTable\" border=1><tr><td><b>#</b></td>";
        //~ for (var fieldname in header){
			//~ tempHead=tempHead+'<th scope ="col" id="'+header[fieldname]+'"><b>'+header[fieldname]+'</b></th>';
			//~ }
		//~ tempHead=tempHead+'</tr>';
	//~ pagina=headHTML+tempHead+pagina+'</table></body></html>';
	//~ 
	//~ return pagina;
}