function(doc) {
    var itemType="geomagnetic-permanent"; //used for icon image name
    var itemType2="geomagnetic-repeat-station";
  if (doc.facility_type=="geomagnetic_permanent"){
      for (var coordinates in doc.geo_coords){
          var info= "<h2 style='color:blue;font-weight:bold;'>" +doc.ri_name + "</h2>"+"<h3 style='color:blue;font-style:italic;'> Network "+ doc.name +", "+ doc.kind+"</h3>"+ "<b>Station Code:</b>"+doc.geo_coords[coordinates].name+ "<br><b>Latitude:</b>"+doc.geo_coords[coordinates].gpsLat+ "<br><b>Longitude:</b>"+doc.geo_coords[coordinates].gpsLon;
          emit(doc.ri_name, [ parseFloat(doc.geo_coords[coordinates].gpsLat), parseFloat(doc.geo_coords[coordinates].gpsLon), info, itemType]);
          }
	  }
	if (doc.facility_type=="geomagnetic_repeat_stations"){
      for (var coordinates in doc.benchmarks_list_list){
          var info= "<h2 style='color:blue;font-weight:bold;'>" +doc.ri_name + "</h2>"+"<h3 style='color:blue;font-style:italic;'> Network "+ doc.name +", "+ doc.kind+"</h3>"+ "<b>Station Code:</b>"+doc.benchmarks_list_list[coordinates].code+ "<br><b>Latitude:</b>"+doc.benchmarks_list_list[coordinates].gpsLat+ "<br><b>Longitude:</b>"+doc.benchmarks_list_list[coordinates].gpsLon;
          emit(doc.ri_name, [ parseFloat(doc.benchmarks_list_list[coordinates].gpsLat), parseFloat(doc.benchmarks_list_list[coordinates].gpsLon), info, itemType2]);
          }
      }
}