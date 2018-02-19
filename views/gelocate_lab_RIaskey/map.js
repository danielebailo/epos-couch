function(doc) {
    var itemType="lab-small";
  if (doc.facility_type=="laboratory"){
      var info= "<h2 style='color:blue;font-weight:bold;'>" +doc.ri_name + "</h2>"+"<h3 style='color:blue;font-style:italic;'>"+ doc.laboratory_name +"</h3>"+ doc.lab_address + doc.lab_city + "<br>" + "<b>site:</b><a href='"+doc.lab_www+"' target='_blank'>"+doc.lab_www+"</a>";
      emit(doc.ri_name, [doc.lab_gpsLat, doc.lab_gpsLon,  info, itemType ]);
      }

}