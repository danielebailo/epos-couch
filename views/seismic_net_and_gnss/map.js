function(doc){
	if(doc.facility_type=='seismic_net'){
		if (doc.network_code!=''){
			emit(doc.network_code,doc.ri_name );
			}
	}
	else if (doc.facility_type=='gnss_net'){
		if (doc.gnss_net_name!=''){
			emit(doc.gnss_net_name,doc.ri_name);
			}
	}
}