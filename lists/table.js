function(head, req) {
  start({
    "headers": {
      "Content-Type": "text/html"
     }
  });
  var rowArray = new Array();
  var count=0;
  var bho="";
  var pagina="<script type=\"text/javascript\" src=\"script/test/vendor/json2.js\"></script>\
    <script type=\"text/javascript\" src=\"script/jquery-1.7.2-min.js\"></script>\
<script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\"></script>";
  pagina=pagina+"<html><header></header><body><form action=\"http://epos.bo.ingv.it/assets/documents/ride/SaveToExcel.php\" method=\"post\" target=\"_blank\" onsubmit='$(\"#datatodisplay\").val( $(\"&lt;div&gt;\").append( $(\"#ReportTable\").eq(0).clone() ).html() );console.log($(\"#datatodisplay\"));\'> <input  type=\"image\" src=\"/epos-couch/_design/epos-couch/img/xcel.png\"  > <input type=\"hidden\" id=\"datatodisplay\" name=\"datatodisplay\" /></form>";
  pagina=pagina +" <table id=\"ReportTable\" border=1>";
  // puts all doc values in a rowArray
      while(row = getRow()){
        rowArray.push(row.value);
        }
    var fieldnames=new Array();
    for(field in rowArray[0]){
        fieldnames.push(field);
        }
    
    //writes field names labels
    pagina=pagina+'<tr><td> <b>ROW NUMBER</b></td>';
    for(field in fieldnames){
        pagina=pagina+'<td id="'+fieldnames[field]+'"> <b>'+fieldnames[field]+'</b></td>\n';
        }
    pagina=pagina+'</tr>';
    
    
    
    //renders table
    for(row in rowArray){
        pagina=pagina+'<tr><td><b>'+row+'</b></td>';
        for(field in fieldnames){
            pagina=pagina+'<td id="'+fieldnames[field]+'">'+rowArray[row][fieldnames[field]]+'</td>\n';
            }
        pagina=pagina+'</tr>';
        }
  pagina=pagina+'</table>'+'</body></html>';
	
	return pagina;
}