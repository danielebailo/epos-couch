// map
function(doc) {
	if (doc.doctype=='ri'){
		emit(doc.ri_institution, 1);
		}
		
}