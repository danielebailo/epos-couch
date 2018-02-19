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

	var joinPart;
	var justFoundRIgeneralInfo=false;
	var riName="";
	while(row = getRow()){
		if (row.key[1]==null){//general info
			  if(justFoundRIgeneralInfo==true){//the previous line was a general info (joinPart) and not a facility
				rowArray.push([].concat(joinPart,[]));
				  }
				joinPart=row.value;
				justFoundRIgeneralInfo=true;
				riName=row.key[0];
			}
		else{//facility
			if (row.key[0]==riName){//join only if this facility belongs to the previous ri in the list
				rowArray.push([].concat(joinPart,row.value));
				justFoundRIgeneralInfo=false;
				}
			}
		}

    
    //renders table
    //~ var writeHeader=true; //do I have to write hedaer?
    var pagina="<tbody>";// " <table id=\"ReportTable\" border=1>";
    var header=[];
    for(row in rowArray){
		
		var i=0;
		for(field in rowArray[row]){
			if(header[i]==undefined){
				header[i]=Object.keys(rowArray[row][field])[0];
				}
				i=i+1;
			}
		//~ writeHeader=false;
        pagina=pagina+'<tr><td><b>'+row+'</b></td>';
        for(field in rowArray[row]){
            pagina=pagina+'<td id="'+rowArray[row][field][Object.keys(rowArray[row][field])[0]]+'">'+rowArray[row][field][Object.keys(rowArray[row][field])[0]]+'</td>\n';
            }
        pagina=pagina+'</tr>';
        }
        //attacj table heder
        
        var tempHead="<table id=\"ReportTable\" border=1><tr><td><b>#</b></td>";
        for (var fieldname in header){
			tempHead=tempHead+'<th scope ="col" id="'+header[fieldname]+'"><b>'+header[fieldname]+'</b></th>';
			}
		tempHead=tempHead+'</tr>';
	pagina=headHTML+tempHead+pagina+'</table></body></html>';
	
	return pagina;
}