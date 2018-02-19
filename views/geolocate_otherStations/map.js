function(doc) {
    var itemType="generic-station"; //used for icon image name
  if (doc.facility_type=="volcanological_facility"){
      for (var station in doc.stations){
          var info= "<h2 style='color:blue;font-weight:bold;'>" +doc.ri_name + "</h2>"+"<h3 style='color:blue;font-style:italic;'> Network "+ doc.network_name +", "+ doc.volc_fac_type+"</h3>"+ "<b>Station Code:</b>"+doc.stations[station].Station_code+"<br><b>Latitude</b>: "+ doc.stations[station].gpsLat+"<br><b>Longitude</b>: "+ doc.stations[station].gpsLon;
          emit(doc.ri_name, [ parseFloat(doc.stations[station].gpsLat), parseFloat(doc.stations[station].gpsLon), info, itemType]);
          }
      }
}