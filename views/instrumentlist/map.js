function(doc) {
if (doc.facility_type=='laboratory'){
var instrList=[];
   for (strumento in doc.equipment){
       emit(null,[doc.ri_name,doc.laboratory_name,  doc.equipment[strumento].type, doc.equipment[strumento].quantity,doc.equipment[strumento].year_of_acquisition, doc.equipment[strumento].purchase_value,doc.equipment[strumento].instrument_contact_person, doc.equipment[strumento].instrument_contact_person_email]);
       
       //~ instrList.push([doc.equipment[strumento].type, doc.equipment[strumento].year_of_acquisition, doc.equipment[strumento].purchase_value, doc.equipment[strumento].instrument_contact_person, doc.equipment[strumento].instrument_contact_person_email]);
      }
   }
  
}


//~ function(doc) {
//~ if (doc.facility_type=='laboratory'){
//~ var instrList=[];
   //~ for (strumento in doc.equipment){
       //~ instrList.push([doc.equipment[strumento].type, doc.equipment[strumento].year_of_acquisition, doc.equipment[strumento].purchase_value]);
      //~ }
   //~ instrList.unshift(doc.laboratory_name);
   //~ instrList.unshift(doc.ri_name);
   //~ 
   //~ emit(null,instrList);
   //~ }
  //~ 
//~ }