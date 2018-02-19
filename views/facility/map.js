function(doc){
	if(doc.doctype=='facility' || doc.doctype == "datacentre"){
		emit([doc.ri_name, doc], 1);
	}
	
}