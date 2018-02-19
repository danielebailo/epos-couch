// map
function(doc) {
	if (doc.doctype=='ri'){
		emit(doc.country, 1);
		}
		
}