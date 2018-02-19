////*******************************   HELPERS ************************//////
	
	function randomHashString() {
	    var chars = "0123456789abcdefghiklmnopqrstuvwxyz";
	    var string_length = 32;
	    var randomstring = '';
	    for (var i=0; i<string_length; i++) {
		    var rnum = Math.floor(Math.random() * chars.length);
		    randomstring += chars.substring(rnum,rnum+1);
		}
	    return randomstring;
	    }
	
	//function to get data from server (view or list), used in visualsearch callbacks definition 
	function getJSONData(myurl) {
	var data;
	$.ajax({
	    async: false, //thats the trick
	    url: myurl,
	    dataType: 'json',
	    success: function(response){
	       data = response;
			    }
		    });
	return data;
	}
	
	var RUfacets=getJSONData('_list/json_field_names/field_names');
	var RUvalueMatches=getJSONData('_list/facets_category_value_array/allfields');
	var JSONriDescription='_list/aggregate_items/allfields_RIaskey';
	var JSONriView="_view/allfields_RIaskey";
	

	//*************** GLOBAL VARS *****************
	
	var ri_types=["PLEASE SELECT","Seismic Network","Volcano Observatory","Geological Repository","GPS Network","International Data Infrastructure","Laboratory","Data repository","In-situ fault-zone observatory","EPOS Supersite","Marine Research Infrastructures","Geomagnetic Observatory/network","Satellite data processing infrastructure","Computational Infrastructure (independent of monitoring RIs)","Other","N/A"];
	var seismic_network_kinds=["PLEASE SELECT","National", "Regional", "Local", "Mobile","Other","N/A"];
	var data_type_options=["PLEASE SELECT","TimeSeries","metadata", "Parametric","other","N/A"];
	var data_format_options=["PLEASE SELECT","GFC","GSE","SAC","ASCII","miniSEED","Earthworm","nanometrics","seisan","other","N/A"];
	var data_transmission_options=["PLEASE SELECT","real-time","delayed","on-demand","other","N/A"];
	var data_policy_options=["PLEASE SELECT","open","restricted","on-request","closed","other","N/A"];
	var seismicStationTypes=["PLEASE SELECT","very broadband","broadband","strongmotion","shortperiod","very broadband / strongmotion","broadband / strongmotion","shortperiod / strongmotion","N/A"];
	var wg_list=[1,2,3,4,5,6,7,8];
	var lab_data_policy=["PLEASE SELECT","payment","collaboration only","free of charge","other"];
	var instr_ded_pers=["PLEASE SELECT","yes-permanent","yes-not permanent","no"];
	
	//MODELS FOR different kinds of equipment, USED IN THE POPUP UPDATE FORM 
	var LabInstrument = Backbone.Model.extend({
		schema:{
			type: {type:'Text'},
			brand: {type:'Text'},
			specifics: {type:'TextArea'},
			year_of_acquisition: {type:'Date', title:"Year of acquisition"},
			purchase_value: {type:'Number', title:"Purchase Value (euros)"},
			quantity: {type:'Number'},
			access_policy: {type:'Select',options:lab_data_policy,title:"Access policy"},
			instrument_www:{type:'Text', title:"instrument website"},
			instrument_contact_person:{type:"Text", title:"Instrument contact person"},
			instrument_contact_person_phone:{type:"Text", title:"Instrument contact person Phone"},
			instrument_contact_person_email:{type:"Text", title:"Instrument contact person email"},
			instrument_personnel:{type:'Select', options:instr_ded_pers, title:'Instrument dedicated personnel'},
			comments:{type:'TextArea'}
			},
		toString:function(item){
			return JSON.stringify(this.schema.type);// + this.schema.brand;
			}
		});
		
	var seismicSation = Backbone.Model.extend({
		schema:{
			Station_code:{type:'Text'},
			type: {type:'Select', options:seismicStationTypes},
			gpsLat:{type:'Number'},
			gpsLon:{type:'Number'},
			gpsElev:{type:'Number'},
			number_of_sensors: {type:'Select', options:[1,2]}
			},
		toString:function(item){
			return JSON.stringify(this.schema.type);// + this.schema.brand;
			}
		});


//*********SCHEMA FOR THE EDITOR*********
	var backboneJSONform={
		ri:{
			   _id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Text', title:"RI NAME"},
			   ri_type: {type:'Select', options:ri_types, title:"RI type"},
			   file_path:{type:'Text', title:"File path"},
			   country: {type:'Select', options:(RUvalueMatches.country)[0]},
			   ri_institution:{type:'Text', title:"RI institution"},
			   ri_website:{type:'Text', dataType:"url", title:"RI website"},
			   wg_main: {type:'Select',options:wg_list, title: "WG (main)"},
			   wg_related: {type:'List', listType:'Select',options:wg_list, title:"WG (related)"},
			   ri_manager:{type:'Text', title: "RI manager"},
			   ri_manager_email:{ type:'Text', dataType: 'email', validators: ['required'], title:"RI manager email" },
			   ri_manager_phone: {type:'Text', title:"RI manager phone"},
			   ri_manager_institution: {type:'Text', title:"RI manager institution"},
			   national_contact_person: {type:'Text', title:"National contact person"},
			   national_contact_person_email:{ dataType: 'email', validators: ['required'], title:"National contact person email" },
			   national_contact_person_phone:{type:'Text', title:"National contact person phone"},
			   national_contact_person_institution: {type:'Text', title:"National contact person institution"},
			   legal_contact_person: {type:'Text', title:"Legal contact person"},
			   legal_contact_person_email:{ dataType: 'email', validators: ['required'], title:"Legal contact person email" },
			   legal_contact_person_phone: {type:'Text', title:"Legal contact person phone"},
			   legal_contact_person_institution: {type:'Text', title:"Legal contact person institution"},
			   financial_contact_person: {type:'Text', title:"Financial contact person"},
			   financial_contact_person_email:{ dataType: 'email', validators: ['required'], type:'Text', title:"Financial contact person email" },
			   financial_contact_person_phone: {type:'Text', title:"Financial contact person phone"},
			   financial_contact_person_institution: {type:'Text', title:"Financial contact person institution"},
			   comments:{type:'TextArea'}
			},
			
		generic_facility:{
		   _id: {type:'Hidden'},
		   _rev: {type:'Hidden'},
		   doctype: {type:'Hidden'},
		   ri_name: {type:'Hidden'},
		   facility_type: {type:'Text'},
		   network_code:{type:'Text'},
		   kind: {type:'Select', options:seismic_network_kinds },
		    equipment: {type:'List', listType:'NestedModel', model: seismicSation, itemToString:function(instrument){
					var myText=(instrument.Station_code+' --\t'+instrument.type);
					//~ alert(myText);
					return myText;
					}
				},
		   site_of_study: {type:'Text',  help: 'In case of Array or localized network' },
		    data_type: {type:'Select', options:data_type_options},
		   data_format: {type:'Select', options:data_format_options},
		   data_transmission: {type:'Select', options: data_transmission_options},
		   data_policy: {type:'Select', options:data_policy_options },
					   purchase_value: {type:'Number'},
		   year_of_acquisition: {type:'Date'},
		   location: {type:'Text'},
		   specifics: {type:'Text'},
		   data_policy: {type:'Text'},
		    other_details: {type:'TextArea'}
		},
			
		seismic_net:{
			   _id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   facility_type: {type:'Hidden'},
			   network_code:{type:'Text', title:"Network code", title:"Network code"},
			   kind: {type:'Select', options:seismic_network_kinds },
			    stations: {type:'List', listType:'NestedModel', model: seismicSation, itemToString:function(instrument){
						var myText=(instrument.Station_code+' --\t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
			   site_of_study: {type:'Text',  title:"Site of study"},
			    data_type: {type:'Select', options:data_type_options, title:"Data type"},
			   data_format: {type:'Select', options:data_format_options, title:"Data format"},
			   data_transmission: {type:'Select', options: data_transmission_options, title:"Data transmission"},
			   data_policy: {type:'Select', options:data_policy_options, title:"Data policy" },
			    other_details: {type:'TextArea', title:"Other details"}
			},
			
		gps_net:{
			   _id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   facility_type: {type:'Hidden'},
			   kind: {type:'Text'},
			   quantity: {type:'Number'},
			    equipment: {type:'List', listType:'NestedModel', model: LabInstrument, itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						return myText;
						}
					},
			   location: {type:'Text'},
			   coverage: {type:'List', listType:'Text'},
			   site_of_study: {type:'Text', title:"Site of study"},
			   specifics: {type:'Text'},
			    data_type: {type:'List', listType:'Text', title:"Data type"},
			   data_format: {type:'List', listType:'Text', title:"Data format"},
			   data_transmission: {type:'Text', title:"Data transmission"},
			   data_policy: {type:'Text', title:"Data policy"},
			   status: {type:'Hidden'},
			    other_details: {type:'TextArea',title:"Other details"}
			},
			
		 laboratory:{
			   _id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   facility_type: {type:'Hidden'},
			   laboratory_name: {type:'Text', title:"Laboratory name"},
			    equipment: {type:'List', listType:'NestedModel', model: LabInstrument, itemToString:function(instrument){
						var myText=(instrument.quantity+' \t'+instrument.type);
						//~ alert(myText);
						return myText;
						}
					},
			   lab_contact_person:{type:"Text", title:"Laboratory contact person"},
			   lab_contact_person_phone:{type:"Text", title:"Laboratory contact person Phone"},
			   lab_contact_person_email:{type:"Text", title:"Laboratory contact person email"},
			   lab_address: {type:'Text', title:"Full address (st., city, PObox)"},
			   lab_city:{type:'Text', title:"City"},
			   lab_location: {type:'Text', title:"Lab gps coords"},
			   lab_www:{type:'Text', title:"Laboratory website"},
			   data_type: {type:'List', listType:'Text', title:"Data type"},
			   status: {type:'Hidden'},
			    other_details: {type:'TextArea',title:"Other details"}
			},
			
		datacentre:{
			   _id: {type:'Hidden'},
			   _rev: {type:'Hidden'},
			   doctype: {type:'Hidden'},
			   status: {type:'Hidden'},
			   ri_name: {type:'Hidden'},
			   data_centre_acquisition_software: {type:'Text', title:"Data centre acquisition software"},
			   data_centre_hardware: {type:'Text', title:"Data centre hardware"},
			   data_centre_storage_capacity_tb: {type:'Number', title:"Data centre storage capacity tb"},
			   "data_centre_growth_rate_storage_capacity_tb-y": {type:'Number', title:"Data centre growth rate storage capacity tb-y"},
			   data_organization: {type:'Text', title:"Data organization"},
			   data_volume_tb: {type:'Number', title:"Data volume tb"},
			   "data_volume_growth_rate_tb-y": {type:'Number', title:"Data volume growth rate tb-y"},
			   dc_connectivity_bandwidth: {type:'Text', title:"Dc connectivity bandwidth"} ,
			   dc_connectivity_protocols: {type:'Text', title:"Dc connectivity protocols"},
			   dc_objective: {type:'Text', title:"Dc  objective"},
			   dc_software: {type:'Text', title:"Dc software"},
			   licenced_software: {type:'Text', title:"Licenced software"},
			   data_policy: {type:'Text', title:"Data policy"}
			},
		dataarchive:{
		   "_id": {type:'Hidden'},
		   "_rev": {type:'Hidden'},
		   "doctype": {type:'Hidden'},
		   "status": {type:'Hidden'},
		   "ri_name": {type:'Hidden'},
		   "data_archive_data_type": {type:'List', listType:'Text'},
		   "data_archive_software": {type:'Text'},
		   "data_archive_hardware": {type:'Text'},
		   "data_archive_organization": {type:'Text'},
		   "data_archive_storage_tb": {type:'Number'},
		   "data_archive_volume_tb": {type:'Number'},
		   "data_archive_volume_growth_rate_tb-y": {type:'Number'},
		   "data_archive_os": {type:'Text'},
		   "data_archive_access": {type:'Text'},
		   "data_archive_policy": {type:'Text'}
			},
		financial:{
		    "_id": {type:'Hidden'},
		   "_rev": {type:'Hidden'},
		    "ri_name":{type:'Hidden'},
		    "doctype":{type:'Hidden'},
		    "ri_total_value":{type:'Number', title:"RI total Value"},
		    "total_labour_costs":{type:'Text', title:"Total Labour costs"},
		    "total_labour_full_time_equivalent":{type:'Number', title:"Total Labour full time equivalent"},
		    "annual_running_cost_budget":{type:'Number', title:"Annual running cost budget"},
		    "total_common_services_participating":{type:'Number', title:"Total common services participating"},
		    "total_cost_of_RI":{type:'Number', title:"Total cost of RI"},
		    "total_funding_of_labour":{type:'Number', title:"Total funding of labour"},
		    "total_funding_of_labour_full_time_equivalent":{type:'Number', title:"Total funding of labour full time equivalent"},
		    "total_funding_of_running_costs":{type:'Number', title:"Total funding of running costs"},
		    "total_funding_for_RI":{type:'Number', title:"Total funding for RI"},
		    "comments":{type:'TextArea'}
		    }
	};
