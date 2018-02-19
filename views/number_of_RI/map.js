// map
function(doc) {
	if (doc.doctype=='ri')
		emit(doc.ri_name, 1);
}