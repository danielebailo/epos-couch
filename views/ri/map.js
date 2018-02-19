function(doc){
	if(doc.doctype=='ri'){
		emit(doc.ri_name, [doc.ri_name, doc.country, doc.wg, doc.ri_manager, doc.ri_manager_email]);
	}
}