function(doc){
	if(doc.doctype=='ri'){
		emit([doc.ri_name,null,1], [{"ri name":doc.ri_name}, {"country":doc.country},{"NCP":doc.national_contact_person}, {"NCP email":doc.national_contact_person_email}, {"working group(s)":doc.wg},{"ri institution":doc.ri_institution}, {"ri manager":doc.ri_manager},{"ri manager email": doc.ri_manager_email}]);
	}
}