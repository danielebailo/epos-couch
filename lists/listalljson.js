function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "application/json"
     }
  });
  var pagina='{ "docs":[\n';
  var counter=0;
  while(row = getRow()) {
	delete row.value._id;
	delete row.value._rev;
  pagina=pagina+JSON.stringify(row.value);
  pagina=pagina+',\n';
  counter=counter+1;
  }
  pagina=pagina.slice(0,-2);
  pagina=pagina+'],\n';
  pagina=pagina+'"rows":"'+counter+'"\n}';
  
  return pagina;
}