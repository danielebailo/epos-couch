function(doc) {
    var itemType="seism-station";
  if (doc.facility_type=="seismic_net"){
      for (var station in doc.stations){
          var orf_mem="no;"
          if (doc.stations[station].orfeus_member=="yes"){
			  itemType="orfeus-seism-station";
			  orf_mem="yes";
			  }
		  else{
			  itemType="seism-station";
			  }
		  var info= "<h2 style='color:blue;font-weight:bold;'>" +doc.ri_name + "</h2>"+"<h3 style='color:blue;font-style:italic;'> Network "+ doc.network_code +", "+ doc.kind+"</h3>"+ "<b>Station Code:</b>"+doc.stations[station].Station_code+"<br><b>Latitude</b>: "+ doc.stations[station].gpsLat+"<br><b>Longitude</b>: "+ doc.stations[station].gpsLon+"<br><b>available at Orfeus</b>: "+orf_mem;
          emit(doc.ri_name, [ parseFloat(doc.stations[station].gpsLat), parseFloat(doc.stations[station].gpsLon), info, itemType]);
          }
      }

}