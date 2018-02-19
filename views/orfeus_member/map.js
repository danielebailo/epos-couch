function(doc) {
	if (doc.facility_type=="seismic_net" && doc.stations.length>0){
		var orf=0;
                var notorf=0;
		for (var stat in doc.stations){
			if (doc.stations[stat].orfeus_member=="yes"){
			orf=orf+1;
			}
                        else {notorf=notorf+1}
		}
	emit ([{"NOT in Orfeus":notorf},{"IN Orfeus":orf},doc.ri_name],1);
	}   
}