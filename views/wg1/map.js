function (doc)
{
  if (doc.doctype == "ri" && (doc.wg.indexOf('1') > -1 || doc.wg.indexOf(1) > -1))
  {
    emit([doc.ri_name, null], [{"ri name":doc.ri_name}, {"country":doc.country},{"working group": doc.wg}, {"ri manager":doc.ri_manager},{"ri manager email": doc.ri_manager_email}]);
  }

  if (doc.facility_type=='seismic_net'){
	var stationTypes={};//{"very broadband":{"total":0,"orfeus":0},"broadband":{"total":0,"orfeus":0},"strongmotion":{"total":0,"orfeus":0},"shortperiod":{"total":0,"orfeus":0},"very broadband / strongmotion":{"total":0,"orfeus":0},"broadband / strongmotion":{"total":0,"orfeus":0},"broadband / shortperiod":{"total":0,"orfeus":0},"shortperiod / strongmotion":{"total":0,"orfeus":0},"infrasound":{"total":0,"orfeus":0}, "strainmeter":{"total":0,"orfeus":0}};
   for (strumento in doc.stations){
	   if ((doc.stations[strumento].type in stationTypes)==false){
		   stationTypes[doc.stations[strumento].type]=new Object({"total":0,"orfeus":0});
		   }
		stationTypes[doc.stations[strumento].type].total=stationTypes[doc.stations[strumento].type].total+1;
		if (doc.stations[strumento].orfeus_member=="yes"){
			stationTypes[doc.stations[strumento].type].orfeus=stationTypes[doc.stations[strumento].type].orfeus+1;
			}
      }
      
     
   for (var type in stationTypes){
	   //~ emit (null, null);
		emit([doc.ri_name, 1],[{"network code":doc.network_code},{"network type":doc.kind},{"station type":  type},{"# of stations": stationTypes[type].total}, {"# of ORFEUS stations": stationTypes[type].orfeus}]);
	   }
   
   }
}