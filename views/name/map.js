function(doc){
	if(doc.ri_manager) {
		emit({"name":doc.ri_manager});
	}
	else if(doc.national_contact_person) {
		emit({"name":doc.national_contact_person});
	}
	else if (doc.instrument_contact_person){
	  emit({"name":doc.instrument_contact_person});
	}
	else if (doc.lab_contact_person){
	  emit({"name":doc.lab_contact_person});
	}
}