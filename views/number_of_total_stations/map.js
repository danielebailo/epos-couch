// map
function(doc) {
	if (doc.doctype=='facility'){
		var total=0;
		if (doc.facility_type=='seismic_net' ){
			for (var station in doc.stations){
				total=total+1;
				}
			}
		else if (doc.facility_type=='gnss_net' ){
			for (var station in doc.GNSS_stations){
				total=total+1;
				}
			}
		else {total=0}
		emit(doc.ri_name, total);
		}
		
}