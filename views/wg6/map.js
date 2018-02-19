function (doc)
{
  if (doc.doctype == "ri" && (doc.wg.indexOf("6") > -1 || doc.wg.indexOf(6) > -1))
  {
    emit([doc.ri_name, null,1], [{"ri name":doc.ri_name}, {"country":doc.country},{"country":doc.country},{"NCP":doc.national_contact_person}, {"NCP email":doc.national_contact_person_email}, {"working group(s)":doc.wg}, {"ri manager":doc.ri_manager},{"ri manager email": doc.ri_manager_email}]);
  }

var instrList=[];
   for (strumento in doc.equipment){
       emit([doc.ri_name, 1,1],[{"lab name":doc.laboratory_name},{"laboratory contact person":doc.lab_contact_person},{"laboratory contact person email":doc.lab_contact_person_email},{"instr. type":  doc.equipment[strumento].type},{"isntr. quantity": doc.equipment[strumento].quantity},{"year of acq.":doc.equipment[strumento].year_of_acquisition},{"purch. value": doc.equipment[strumento].purchase_value},{"instr. contact person":doc.equipment[strumento].instrument_contact_person},{"instr. contact person email": doc.equipment[strumento].instrument_contact_person_email}]);
       

      }

   }