function (doc)
{
  if (doc.doctype == "ri" && (doc.wg.indexOf("4") > -1 || doc.wg.indexOf(4) > -1))
  {
    emit([doc.ri_name, null,1], [{"ri name":doc.ri_name},{"country":doc.country},{"NCP":doc.national_contact_person}, {"NCP email":doc.national_contact_person_email}, {"working group(s)":doc.wg}, {"ri manager":doc.ri_manager}, {"ri manager email":doc.ri_manager_email}]);
  }

  if (doc.facility_type=='gnss_net'){
	var stationQuantity=0;
   for (strumento in doc.GNSS_stations){
	   stationQuantity=stationQuantity+1;
      }


		emit([doc.ri_name, 1,1],[{"gnss network name":doc.gnss_net_name},{"gnss network kind":doc.gnss_net_kind},{"# of stations":stationQuantity}]);

   
   }
}