function (doc)
{
  if (doc.doctype == "ri" && (doc.wg.indexOf("1") > -1 || doc.wg.indexOf(1) > -1))
  {
    emit([doc.ri_name, null],     [{"ri name":doc.ri_name}, {"country":doc.country},{"country":doc.country},{"NCP":doc.national_contact_person}, {"NCP email":doc.national_contact_person_email}, {"working group(s)":doc.wg}, {"ri manager":doc.ri_manager},{"ri manager email": doc.ri_manager_email}]);

  }

  if (doc.facility_type=='seismic_net'){
   var totstat=0;
   var orf=0;
   var notorf=0;
   for (strumento in doc.stations){
	   totstat=totstat+1;
	   if (doc.stations[strumento].orfeus_member=="yes"){
			orf=orf+1;
			}
       else {notorf=notorf+1}
      }

   emit([doc.ri_name, 1],[{"network code":doc.network_code},{"network type":doc.kind},{"total stations":  totstat},{"NON orfeus stations":notorf},{"Orfeus stations":orf}]);
   }
}