function(doc){
	if(doc.doctype=='ri'){
		emit({"_id":doc._id, "name":doc.ri_name, "type":doc.wg, "country":doc.country, "organisation":doc.ri_institution,"website":doc.website, "science domain":doc.wg,"contact person":{"name":doc.national_contact_person, "email":doc.national_contact_person_email},"ri manager":{"name":doc.ri_manager,"email": doc.ri_manager_email}});
	}
}