function(doc) {
    var itemType="gps-station"; //used for icon image name
    var itemType2="gps-benchmark";
  if (doc.facility_type=="gnss_net"){
      for (var station in doc.GNSS_stations){
          var info= "<h2 style='color:blue;font-weight:bold;' >" +doc.ri_name + "</h2>"+"<h3 style='color:blue;font-style:italic;'> Network "+ doc.gnss_net_name +", "+ doc.gnss_net_kind+"</h3>"+ "<b>Station Code:</b>"+doc.GNSS_stations[station].station_code+ "<br><b>Latitude:</b>"+doc.GNSS_stations[station].gpsLat+ "<br><b>Longitude:</b>"+doc.GNSS_stations[station].gpsLon;
          emit(doc.ri_name, [ parseFloat(doc.GNSS_stations[station].gpsLat), parseFloat(doc.GNSS_stations[station].gpsLon), info, itemType]);
          }
      for (var benchmark in doc.gnss_benchmarks){
          var info= "<h2 style='color:blue;font-weight:bold;'>" +doc.ri_name + "</h2>"+"<h3 style='color:blue;font-style:italic;'> Network "+ doc.gnss_net_name +", "+ doc.gnss_net_kind+"</h3>"+ "<b>Station Code:</b>"+doc.gnss_benchmarks[benchmark].station_code+ "<br><b>Latitude:</b>"+doc.gnss_benchmarks[benchmark].gpsLat+ "<br><b>Longitude:</b>"+doc.gnss_benchmarks[benchmark].gpsLon;
          emit(doc.ri_name, [ parseFloat(doc.gnss_benchmarks[benchmark].gpsLat), parseFloat(doc.gnss_benchmarks[benchmark].gpsLon), info, itemType2]);
          }
      }
}