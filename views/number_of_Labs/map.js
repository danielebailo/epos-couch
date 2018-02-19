// map
function(doc) {
	if (doc.doctype=='facility' && doc.facility_type=="laboratory"){
		emit(doc.laboratory_name, 1);
		}
		
}