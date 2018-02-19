function(doc){
	if(doc.facility_type=='seismic_net'){
		emit(doc.ri_name, doc);
	}
}