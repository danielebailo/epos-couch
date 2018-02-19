function (doc)
{
  if (doc.doctype == "ri" && (doc.wg.indexOf("6") > -1 || doc.wg.indexOf(6) > -1))
  {
    emit([doc.ri_name, null,1], [{"ri name":doc.ri_name}, {"country":doc.country},{"NCP":doc.national_contact_person}, {"NCP email":doc.national_contact_person_email}, {"working group(s)":doc.wg}, {"ri manager":doc.ri_manager},{"ri manager email": doc.ri_manager_email}]);
  }
  
  if (doc.facility_type=="laboratory"){
	var instrList=[];
	var missingPurchVal=0;
	var missingYearOfAcq=0;
	var instrQuantity=0;
	
	
	for (strumento in doc.equipment){
        if (doc.equipment[strumento].purchase_value!=undefined && (doc.equipment[strumento].purchase_value==0 || doc.equipment[strumento].purchase_value=="0")){ //purch val not declared
		   missingPurchVal=missingPurchVal+1;
		   }
		if (doc.equipment[strumento].year_of_acquisition!=undefined && ( doc.equipment[strumento].year_of_acquisition==0 || doc.equipment[strumento].year_of_acquisition=='0' || doc.equipment[strumento].year_of_acquisition.toString().indexOf(":")!=-1)){//date missing or in utc format
			missingYearOfAcq=missingYearOfAcq+1;
			}
		instrQuantity=instrQuantity+doc.equipment[strumento].quantity;
		}
		
	emit([doc.ri_name, 1,1],[{"lab name":doc.laboratory_name},{"laboratory contact person":doc.lab_contact_person},{"laboratory contact person email":doc.lab_contact_person_email},{"instr. quantity": doc.equipment.length},{"missing year of acq.":missingYearOfAcq},{"missing purch. value": missingPurchVal},{"tot instr. quant.":instrQuantity}]);
	
	}
}