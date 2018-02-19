function(doc) {
if (doc.facility_type=='seismic_net'){
var stationTypes={"very broadband":0,"broadband":0,"strongmotion":0,"shortperiod":0,"very broadband / strongmotion":0,"broadband / strongmotion":0,"broadband / shortperiod":0,"shortperiod / strongmotion":0,"infrasound":0, "strainmeter":0};
   for (strumento in doc.stations){
	   stationTypes[doc.stations[strumento].type]=stationTypes[doc.stations[strumento].type]+1;
      }
      
     
   for (var type in stationTypes){
	   //~ emit (null, null);
		emit(null,[doc.ri_name,doc.network_code,  type, stationTypes[type]]);
	   }
   
   }
  
}