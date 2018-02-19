function(doc) {
    var itemType="gps-station"; //used for icon image name
    var itemType2="gps-benchmark";
  if (doc.facility_type=="gnss_net"){
      for (var station in doc.GNSS_stations){
          emit(doc.ri_name, [ doc.GNSS_stations[station].station_code, parseFloat(doc.GNSS_stations[station].gpsLat), parseFloat(doc.GNSS_stations[station].gpsLon), itemType]);
          }
      for (var benchmark in doc.gnss_benchmarks){
          emit(doc.ri_name, [ doc.GNSS_stations[station].station_code, parseFloat(doc.GNSS_stations[station].gpsLat), parseFloat(doc.GNSS_stations[station].gpsLon), itemType2]);
          }
      }
}