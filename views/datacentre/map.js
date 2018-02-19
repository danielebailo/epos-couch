function (doc)
{
  if (doc.doctype == "ri")
  {
    emit([doc.ri_name, null], [{"ri name":doc.ri_name}, {"country":doc.country},{"working group": doc.wg}, {"ri manager":doc.ri_manager},{"ri manager email": doc.ri_manager_email}]);
  }

  if (doc.doctype == "datacentre"){
	emit([doc.ri_name, 1],[{"data centre type":JSON.stringify(doc.data_centre_type)},{"Storage capacity (Tb)":doc.data_centre_storage_capacity_tb},{"data volume (Tb)":  doc.data_volume_tb}, {"Networks Connected to the Datacentre":JSON.stringify(doc.data_centre_data_from)}]);
   }
   
  if (doc.facility_type == "gnss_datacentre" || doc.doctype=="gnss_datacentre"){
	emit([doc.ri_name, 1],[{"data centre type":"GNSS Datacentre"},{"Storage capacity (Tb)":doc.data_centre_storage_capacity_tb},{"Total gnss stations archived (only for GNSS DC)":  doc.exclusive_cors}]);
   }
   
     if (doc.facility_type == "data_processing_facility"){
	emit([doc.ri_name, 1],[{"data centre type":"GNSS data processing facility"},{"Avg. number of processed Stations (GNSS only)":doc.proc_st}]);
   }
}