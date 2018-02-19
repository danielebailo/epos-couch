function(doc) {
  if (doc.network_code){
   var orf=0;
   var notorf=0;
   for (var station in stations){
      if (doc.stations[station].orfeus_member=="yes"){
         orf=orf+1;
         }
      else {notorf=notorf+1;}
       }
   emit([doc.ri_name, doc.network_code], [notorf, orf]);
   }
    
}